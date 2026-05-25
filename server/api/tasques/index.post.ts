import { bd } from '../../utils/baseDeDades';
import { taulaTasques } from '../../database/schema';

// Endpoint per crear una nova tasca
export default defineEventHandler(async (event) => {
  const cos = await readBody(event);
  
  // Validació mínima: el títol és obligatori
  if (!cos.titol) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El títol de la tasca és obligatori per poder-la crear.',
    });
  }

  try {
    // Inserim la tasca i retornem el resultat
    const resultat = await bd.insert(taulaTasques).values({
      titol: cos.titol,
      descripcio: cos.descripcio || '',
      estat: 'pendent'
    }).returning();
    
    return resultat[0];
  } catch (error) {
    console.error('Error BD:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error intern en intentar guardar la tasca.',
    });
  }
});
