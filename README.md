# 🌟 Projecte Llumina: Gestor de Tasques AI-Driven (PWA)

**Llumina** és una aplicació web progressiva (PWA) interactiva de llista de tasques (To-Do List) desenvolupada com a part de la pràctica de DAW (Treball de Recerca TR3 - RA2). Integra un assistent conversacional intel·ligent basat en IA que analitza les tasques de l'usuari en temps real i l'ajuda a organitzar la seva jornada d'estudi de forma eficient.

---

## 🛠️ Stack Tecnològic

El projecte fa servir un stack modern i completament serverless:
* **Frontend:** [Nuxt 3](https://nuxt.com/) (Vue 3, Composition API) amb tipografia *Inter* i disseny premium *Glassmorphism*.
* **Backend:** [Nuxt Nitro](https://nitro.unjs.io/) (endpoints serverless a la carpeta `/server/api/`).
* **Base de Dades i ORM:** [SQLite](https://www.sqlite.org/) (base de dades local i portable) amb [Drizzle ORM](https://orm.drizzle.team/) per a la definició de l'esquema relacional en català.
* **Integració d'IA:** [Google Gemini 1.5 Flash](https://deepmind.google/technologies/gemini/) (mitjançant el mòdul oficial `@google/generative-ai`) integrat amb *Prompt Tuning* contextual des del backend.
* **Capacitats PWA:** Configurat amb `@vite-pwa/nuxt` per garantir un registre automàtic de *Service Worker*, funcionament *offline* complet i manifest d'instal·lació.

---

## ✨ Funcionalitats Principals

* **Gestió CRUD de Tasques:** Creació, visualització, canvi d'estat interactiu (pendent ↔ feta) i eliminació en temps real.
* **Nomenclatura en Català:** BD i models rellevants de negoci codificats íntegrament en català per requisits de DAW.
* **Assistent Llumina (IA):** Xat interactiu flotant que es comunica de forma segura mitjançant un proxy serverless backend, evitant l'exposició de l'API Key al client.
* **Prompt Tuning Dinàmic:** El backend injecta l'estat actual de les tasques del client al model per donar consells contextualitzats de productivitat en un català acadèmic, formal i directe.
* **Instal·lació nativa PWA:** Manifest complet amb icones de 192px i 512px.

---

## 📂 Estructura del Projecte

La distribució dels fitxers és la següent:
* `app/` — Directori frontend principal (conté [app.vue](file:///C:/Users/Bryan/Documents/practiques/pwa_ai/app/app.vue) amb estils i lógica reactiva).
* `server/` — Codi backend i base de dades.
  * `api/` — Endpoints serverless (`/api/tasques` i `/api/assistent/xat`).
  * `database/` — Esquema Drizzle [schema.ts](file:///C:/Users/Bryan/Documents/practiques/pwa_ai/server/database/schema.ts).
  * `utils/` — Connexió a base de dades [baseDeDades.ts](file:///C:/Users/Bryan/Documents/practiques/pwa_ai/server/utils/baseDeDades.ts).
* `captures/` — Captures reals de funcionament en mòbil i escriptori.
* `SPEC.md` — Especificació tècnica fundacional (font de veritat).
* `PROCESS.md` — Diari del desenvolupament assistit per IA i solucions a bugs.
* `tasks.md` — Llistat i seguiment complet de les tasques del projecte.
* `documentacio_ia_tr3.pdf` — Documentació oficial en PDF per a l'entrega de TR3.
* `documentacio_entrega_aea2.pdf` — Documentació oficial en PDF per a l'entrega d'AEA2 (Speckit).

---

## 🚀 Instal·lació i Configuració en Local

Per arrencar el projecte al teu ordinador, segueix aquests passos:

### 1. Instal·lar Dependències
Obre la teva consola (Git Bash, Command Prompt o PowerShell) al directori del projecte i executa:
```bash
npm install
```

### 2. Configurar la Clau d'API
Crea (o obre) el fitxer `.env` a l'arrel de l'aplicació i afegeix la teva clau de Google AI Studio:
```env
NUXT_GOOGLE_API_KEY="LA_TEVA_GEMINI_API_KEY"
NUXT_PUBLIC_SITE_URL="http://localhost:3000"
```
*Nota: Si no s'especifica cap clau d'API, l'assistent s'iniciarà automàticament en **mode de simulació (Mock)** per poder provar la interfície del xat.*

### 3. Crear les Taules de la Base de Dades
Fes servir Drizzle Kit per a empènyer l'esquema cap al fitxer SQLite local (`dades.db`):
```bash
npx drizzle-kit push
```

### 4. Executar el Servidor de Desenvolupament
Arrenca Nuxt localment:
```bash
npm run dev
```
Obre [http://localhost:3000](http://localhost:3000) al teu navegador.

### 5. Compilar per a Producció (Opcional)
Per a verificar o realitzar una build de producció:
```bash
npm run build
```

---

## 📝 Metodologia SDD

Aquest programari s'ha creat mitjançant **Specification-Driven Development**. Abans de programar, es van redactar les especificacions funcionals de dades i de comportament a [SPEC.md](file:///C:/Users/Bryan/Documents/practiques/pwa_ai/SPEC.md). Els agents de programació d'IA han utilitzat aquest document com a font única de veritat del sistema, assegurant coherència i reduint de manera dràstica el marge d'error en les fases d'escriptura de codi.

---

