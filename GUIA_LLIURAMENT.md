# 🏁 Guia de Lliurament Final: Projecte Llumina

Aquest document serveix com a llista de comprovació per assegurar que el projecte compleix el 100% dels requeriments de la pràctica de DAW.

## 1. Estat de la Implementació
- [x] **Arquitectura Serverless**: Utilitzant Nuxt Nitro per als endpoints.
- [x] **Base de Dades**: SQLite amb Drizzle ORM (tota la nomenclatura en català).
- [x] **PWA**: Configurada amb manifest, service worker i icones premium generades.
- [x] **IA (Chatbot)**: Integrat amb Gemini 1.5 Flash i context real de tasques.
- [x] **Interfície (UI)**: Disseny premium "Glassmorphism" en català correcte.

## 2. Configuració Necessària abans del Lliurament
Perquè el chatbot funcioni correctament, has de realitzar els següents passos:
1. Obre el fitxer `.env` del projecte.
2. Introdueix la teva clau d'API de Google a la variable `NUXT_GOOGLE_API_KEY=""`.
   - Pots obtenir una clau gratuïta a [Google AI Studio](https://aistudio.google.com/).

## 3. Comprovar el Funcionament Local
Executa els següents comandaments a la terminal per assegurar-te que tot arrenca bé:
```powershell
npm install
npm run dev
```
Accedeix a `http://localhost:3000` i verifica:
- Pots afegir una tasca.
- Pots marcar-la com a feta.
- El botó de l'assistent obre el xat i respon en català (un cop posada la clau d'API).

## 4. Documentació PDF Requerida
La pràctica demana un PDF. Pots utilitzar el contingut dels següents fitxers per omplir els apartats:
- **Explicació de funcionalitats**: Consulta la secció 1 de `SPEC.md`.
- **Procés SDD**: Copia la informació de `PROCESS.md`.
- **Captures**: Fes captures de l'aplicació en marxa (recomanat fer-les amb el simulador de mòbil del navegador per veure el format PWA).

## 5. Lliurament del Repositori
Assegura't de:
1. Pujar tot el contingut a un repositori públic de GitHub.
2. Incloure el fitxer `README.md` amb les instruccions d'instal·lació.
3. No incloure el fitxer `dades.db` ni la teva clau d'API al repositori públic (usa `.gitignore`).

---
**Nota per a l'estudiant:** El projecte ja compleix estrictament amb la normativa de nomenclatura en català exigida. No tradueixis les paraules reservades d'IA o llibreries (ex: `generateContent`), ja que trencaria el codi.
