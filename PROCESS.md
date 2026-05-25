# Diari de Desenvolupament PWA AI-Driven (PROCESS.md)

## Detalls de la Pràctica
- **Projecte:** Gestor de Tasques amb Assistent Intel·ligent (Nuxt PWA)
- **Metodologia:** Specification-Driven Development (SDD)
- **Rol:** Director Tècnic del Sistema 
- **Eina Assistida per IA:** Antigravity

---

## 📅 Registre de Processos i Iteracions

### Fase 1: Arquitectura i Especificació del Sistema (SDD)
* **Activitat Finalitzada:** Redacció iterativa de l'especificació fundacional al directori base (veure `SPEC.md`).
* **Justificació de la Desició:** Es proposa utilitzar `Nuxt 3` conjuntament amb `Nuxt Nitro` (el motor backend del framework) per satisfer exactament el requeriment Serverless de la pràctica, atès que no requereix servidors virtuals clàssics ni processos daemon un cop l'aplicació està empaquetada i desplegada. La gestió del model de LLM del chatbot es delega als endpoints Nitro (amarrats per un sistema de Prompt Tuning contextual) evitant fuites del token privat d'API al JavaScript del frontend. A més, Nuxt implementa correctament Mòduls PWA fiables as a service.
* **Nota del desenvolupador:** Aquest document ha de créixer a les Fases 2 (Desenvolupament Nuxt) i Fase 3 (Disseny Iteratiu GUI).

### Fase 2: Desenvolupament amb Agents d'IA
* **Activitat Finalitzada:** Implementació completa del sistema CRUD de tasques i integració del xat intel·ligent.
* **Detalls Tècnics:**
    - S'ha creat l'esquema de dades en català utilitzant `Drizzle ORM` i `SQLite`.
    - S'han implementat els endpoints serverless a `/server/api` seguint les convencions de Nuxt Nitro.
    - S'ha integrat el model `Gemini 1.5 Flash` a través del mòdul `@google/generative-ai` per a la funcionalitat de l'assistent.
    - S'ha assegurat que tota la nomenclatura de variables i funcions estigui en català (ex: `taulaTasques`, `llistaTasques`, `carregarTasques`).
* **Resolució de problemes:** S'ha ajustat la configuració de `runtimeConfig` a `nuxt.config.ts` per permetre l'ús de claus d'API securitzades des del backend.

### Fase 3: Disseny i UI (Integració)
* **Activitat Finalitzada:** Disseny d'interfície premium directament a `app/app.vue`.
* **Estètica:** S'ha aplicat un estil "Glassmorphism" amb gradients i tipografia Inter per donar un aspecte modern i professional.
* **Responsivitat:** L'aplicació és totalment adaptable a dispositius mòbils (Mobile-first) per complir amb els requisits de PWA.
* **Experiència d'Usuari (UX):** S'han afegit micro-animacions al llistat de tasques i una finestra de xat flotant per facilitar la interacció amb l'IA.

---
### Reflexió Final
El procés de Specification-Driven Development ha permès construir una aplicació robusta en poc temps. L'ús de l'IA com a agent de desenvolupament ha estat clau per generar el codi seguint estrictament les normes de nomenclatura en català i l'arquitectura serverless proposada. El control tècnic s'ha mantingut revisant cada endpoint i component generat.
