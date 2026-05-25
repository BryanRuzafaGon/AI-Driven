import { GoogleGenerativeAI } from '@google/generative-ai';
import { bd } from '../../utils/baseDeDades';
import { taulaTasques } from '../../database/schema';

// Endpoint per processar les consultes al xat amb l'assistent d'IA
export default defineEventHandler(async (event) => {
  const cos = await readBody(event);
  const configuracio = useRuntimeConfig();

  // Validació del missatge de l'usuari
  if (!cos.missatge) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El missatge de l\'usuari no pot estar buit.',
    });
  }

  // 1. Recuperem l'estat actual de les tasques per proporcionar context real a la IA
  let contextTasques = "";
  let llistaTasques: any[] = [];
  try {
    llistaTasques = await bd.select().from(taulaTasques).all();
    contextTasques = llistaTasques.length > 0 
      ? llistaTasques.map(t => `- [${t.estat}] ${t.titol}: ${t.descripcio || 'Sense descripció'}`).join('\n')
      : "L'usuari no té cap tasca pendent actualment.";
  } catch (error) {
    console.error('Error obtenint context per a la IA:', error);
    contextTasques = "No s'ha pogut carregar el context de les tasques.";
  }

  // 2. Inicialitzem el model de Google Generative AI (Gemini)
  const clauApi = configuracio.googleApiKey;
  
  // MODE DE PROVA (MOCK): Si no hi ha clau d'API, simulem una resposta per poder provar la interfície
  if (!clauApi || clauApi === "") {
    console.warn("Avís: No s'ha detectat cap NUXT_GOOGLE_API_KEY. S'està utilitzant el mode de simulació.");
    return { 
      resposta: "[MODE PROVA] Hola! Soc en Llumina. No s'ha configurat cap clau d'API al fitxer .env, així que estic responent en mode simulació. Tinc constància de les teves tasques: " + 
                (llistaTasques.length > 0 ? llistaTasques[0].titol : "cap tasca") + "."
    };
  }

  const genAI = new GoogleGenerativeAI(clauApi);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 3. Preparem el prompt del sistema amb la personalitat i el context requerits
  const promptSistema = `Ets en Llumina, un assistent de productivitat intel·ligent integrat en una aplicació de gestió de tasques per a estudiants.
El teu objectiu és ajudar l'usuari a prioritzar la seva feina i mantenir-se enfocat.
NORMES DE RESPOSTA:
- Respon sempre en CATALÀ correcte i formal.
- No usis emojis, exclamacions ni un to comercial.
- Sigues directe i professional.
- Basa els teus consells en la següent llista de tasques reals de l'usuari:
---
${contextTasques}
---

Missatge de l'usuari: "${cos.missatge}"`;

  try {
    const resultat = await model.generateContent(promptSistema);
    const resposta = await resultat.response;
    return { resposta: resposta.text() };
  } catch (error) {
    console.error('Error en la crida a l\'API d\'IA:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'L\'assistent no ha pogut processar la teva petició en aquest moment.',
    });
  }
});
