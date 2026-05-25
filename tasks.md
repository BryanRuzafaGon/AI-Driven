# Planificació i Seguiment de Tasques: Projecte Llumina

Aquest document detalla el llistat de tasques completades durant el cicle de desenvolupament (Fase de Planning) del Projecte Llumina, seguint la metodologia Spec-Driven Development (SDD).

## 📋 Estat del Projecte: 100% Completat

- [x] **Tasca 1: Disseny de l'Arquitectura i Especificacions**
  - [x] Redacció de l'especificació tècnica inicial a `SPEC.md`.
  - [x] Definició dels actors del sistema (Usuari, Backend, Assistent IA).
  - [x] Definició de l'esquema relacional de base de dades.

- [x] **Tasca 2: Setup de l'Entorn de Desenvolupament**
  - [x] Inicialització del projecte Nuxt 3 (Nuxt 4.4.2).
  - [x] Configuració de Drizzle ORM amb SQLite local (`dades.db`).
  - [x] Definició de l'esquema de base de dades en català a `server/database/schema.ts`.

- [x] **Tasca 3: Desenvolupament de l'API Serverless (Nuxt Nitro)**
  - [x] Implementació del CRUD de tasques a `/server/api/tasques/`.
    - [x] `GET /api/tasques` (Llegir).
    - [x] `POST /api/tasques` (Crear).
    - [x] `PATCH /api/tasques/:id` (Actualitzar estat).
    - [x] `DELETE /api/tasques/:id` (Eliminar).
  - [x] Implementació de la pasarel·la de xat intel·ligent a `/server/api/assistent/xat.post.ts`.
    - [x] Injecció dinàmica del context de tasques reals des de la BD SQLite.
    - [x] Configuració de crida segura a Google Gemini 1.5 Flash mitjançant `NUXT_GOOGLE_API_KEY`.
    - [x] Implementació del mode simulació (Mock) per a proves locals.

- [x] **Tasca 4: Desenvolupament Frontend i UI (Vue 3)**
  - [x] Maquetació de la pàgina principal a `app.vue`.
  - [x] Aplicació de l'estil premium *Glassmorphism* (gradients, elements semi-transparents, tipografia Inter).
  - [x] Desenvolupament de la finestra de xat flotant per a la interacció amb l'assistent d'IA.
  - [x] Implementació de micro-animacions d'entrada (fadeIn) per a la llista de tasques.

- [x] **Tasca 5: Integració de PWA i Offline**
  - [x] Configuració de `@vite-pwa/nuxt` a `nuxt.config.ts`.
  - [x] Creació del fitxer Manifest i definició de les icones del projecte (192px i 512px).
  - [x] Proves de comportament del Service Worker offline.

- [x] **Tasca 6: Revisió Crítica de Codi i Correcció de Bugs (Tech Lead)**
  - [x] Correcció del bug de reactivitat de càrrega a `app.vue` (`carregant.ref` a `carregant.value`).
  - [x] Correcció de l'error de scope condicional a `xat.post.ts` per a la variable `llistaTasques`.
  - [x] Correcció d'àlies d'importació absoluta en compilació de producció en Nuxt 4 (migració d'imports `~/` a relatius dins de `/server`).
  - [x] Configuració correcta del fitxer `.gitignore` per a SQLite i fitxers d'entorn.

- [x] **Tasca 7: Generació de la Documentació Final**
  - [x] Creació de `PROCESS.md` i de la guia de lliurament.
  - [x] Disseny de la memòria final en PDF amb captures reals incrustades.
