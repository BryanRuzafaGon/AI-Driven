# ESP-001: Gestor de Tasques amb Assistent Intel·ligent (PWA)

## 1. Descripció funcional de l'aplicació
L'aplicació és un gestor de tasques (To-Do List) interactiu basat en el paradigma Progressive Web App (PWA). Permetrà als usuaris instal·lar-la als seus dispositius, gestionar els seus quefers diaris i interaccionar amb un chatbot basat en IA. L'assistent tindrà accés a l'estat actual de les tasques i podrà assessorar l'usuari sobre com prioritzar la feina de manera eficient.

## 2. Arquitectura del Sistema
- **Frontend / PWA:** Desenvolupat amb **Nuxt 3 (Vue.js)**. Es configurarà el mòdul `@vite-pwa/nuxt` per garantir capacitats offline i d'instal·lació com a aplicació nativa al mòbil o escriptori.
- **Backend / Capa Serverless:** Endpoints servits directament mitjançant **Nuxt Nitro**. Les funcions s'executaran "on the edge" o en entorns serverless eficients.
- **Base de dades:** Utilitzarem l'emmagatzematge natiu de NuxtHub (o SQLite vinculat i orquestrat per `npm run dev`) per simplificar la part relacional en serverless, limitant la fricció inicial.
- **Integració d'IA (Chatbot):** Trucades des del backend a l'API del model de llenguatge. El backend actuarà com a pont segur (intermediari) injectant el context de les tasques de l'usuari en el prompt central, evitant així exposar claus d'accés (API Keys) al client web.

## 3. Actors del sistema
- **Usuari:** Pot gestionar tasques (crear, completar, eliminar) i consultar el chatbot per obtenir consells sobre l'organització de la seva jornada.
- **Sistema (Backend Serverless):** Emmagatzema l'estat permanent de dades, processa la lògica de negoci de la llista i securitza les connexions externes de l'aplicació.
- **Assistent IA (Chatbot):** Part virtual de l'aplicació que analitza el volum de tasques aportat pel backend i genera el text natural indicat.

## 4. User Journey (Flux d'usuari)
1. **Accés i Instal·lació:** L'usuari accedeix a l'URL de la web, i un bàner el convida a instal·lar la PWA al seu telèfon.
2. **Interacció Principal (Tauler):** Visualitza una interfície clara on destaquen les tasques pendents de fer. N'afegeix de noves fàcilment.
3. **Suport Intel·ligent:** Quan l'usuari se sent aclaparat o no sap per on començar, obre el panell lateral / flotant del Chatbot.
4. **Resolució:** Escriu "Què hauria de fer avui?". El chatbot visualitza el registre complet de tasques pendents de BD i genera una sèrie de consells concrets sobre què fer primer.

## 5. Estructura de dades
Estructura mínima necessària (segons estàndards relacionales Drizzle o SQL nadiu):

**Taula: `tasques`**
- `id` (Enter, Clau Primària, Autoincremental)
- `titol` (String, Obligatori)
- `descripcio` (Text, Opcional)
- `estat` (String Enum: `pendent`, `feta`)
- `creat_el` (Timestamp corrent)

## 6. Llista d'endpoints serverless (API REST)
Tots definits a la carpeta `/server/api/` de Nuxt:
- `GET /api/tasques` - Retorna l'array complet formatat com a JSON de les tasques de BD.
- `POST /api/tasques` - Accepta `{ titol: string }` i l'insereix com a nova entitat.
- `PATCH /api/tasques/:id` - Permet alternar l'estat de `pendent` cap a `feta`.
- `DELETE /api/tasques/:id` - Elimina el registre específic indicat.
- `POST /api/assistent/xat` - Rep l'històric i el missatge de l'usuari (`{ missatge: string }`). El mètode adjunta l'estat actual de les tasques, fa una request cap al model AI configurat i envia de retorn exclusivament la resposta contextualitzada.

## 7. Comportament del chatbot
El backend injectarà secretament abans del missatge de l'usuari un **System Prompt** com aquest:
*"Ets un assistent de productivitat extremadament útil incrustat dins l'aplicació d'un usuari. El teu propòsit és ajudar-lo a organitzar les seves tasques pendents mantenint un llenguatge acadèmic i alhora natural, usant exclusivament el català sense emojis. Aquí tens el context en temps real del seu tauler de treball: [Llista inyectada on-the-fly]. Aconsella'l amb precisió i dona prioritats raonades basades en les dades disponibles."*
