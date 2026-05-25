<script setup lang="ts">
/**
 * Aplicació Llumina - Gestor de Tasques amb IA (PWA)
 * Desenvolupat com a part del Treball de Recerca (DAW)
 */

interface Tasca {
  id: number;
  titol: string;
  descripcio: string | null;
  estat: 'pendent' | 'feta';
  creatEl: string;
}

// Estat reactiu
const llistaTasques = ref<Tasca[]>([]);
const novaTascaTitol = ref('');
const carregant = ref(false);

// Estat del xat
const missatgeUsuari = ref('');
const respostaIA = ref('');
const consultantIA = ref(false);
const xatObert = ref(false);

// Funcions de l'API
async function carregarTasques() {
  carregant.value = true;
  try {
    llistaTasques.value = await $fetch('/api/tasques');
  } catch (error) {
    console.error('Error al carregar tasques', error);
  } finally {
    carregant.value = false;
  }
}

async function afegirTasca() {
  if (!novaTascaTitol.value.trim()) return;

  try {
    const tascaGuardada = await $fetch('/api/tasques', {
      method: 'POST',
      body: { titol: novaTascaTitol.value }
    });
    llistaTasques.value.push(tascaGuardada as Tasca);
    novaTascaTitol.value = '';
  } catch (error) {
    alert('No s\'ha pogut afegir la tasca.');
  }
}

async function alternarEstatTasca(tasca: Tasca) {
  const nouEstat = tasca.estat === 'pendent' ? 'feta' : 'pendent';
  try {
    await $fetch(`/api/tasques/${tasca.id}`, {
      method: 'PATCH',
      body: { estat: nouEstat }
    });
    tasca.estat = nouEstat;
  } catch (error) {
    alert('Error al canviar l\'estat.');
  }
}

async function eliminarTasca(id: number) {
  try {
    await $fetch(`/api/tasques/${id}`, { method: 'DELETE' });
    llistaTasques.value = llistaTasques.value.filter(t => t.id !== id);
  } catch (error) {
    alert('No s\'ha pogut esborrar la tasca.');
  }
}

async function preguntarIA() {
  if (!missatgeUsuari.value.trim()) return;

  consultantIA.value = true;
  respostaIA.value = '';
  
  try {
    const dades = await $fetch('/api/assistent/xat', {
      method: 'POST',
      body: { missatge: missatgeUsuari.value }
    });
    respostaIA.value = (dades as any).resposta;
    missatgeUsuari.value = '';
  } catch (error) {
    respostaIA.value = 'Ho sento, hi ha hagut un error en la connexió amb l\'assistent.';
  } finally {
    consultantIA.value = false;
  }
}

// Inicialització
onMounted(() => {
  carregarTasques();
});
</script>

<template>
  <div class="contenidor-principal">
    <header class="capcalera">
      <h1 id="titol-app">Llumina</h1>
      <p class="subtitol">Gestió Intel·ligent de Tasques</p>
    </header>

    <main class="contingut">
      <!-- Secció del formulari -->
      <section class="seccio-nova-tasca">
        <input 
          v-model="novaTascaTitol" 
          type="text" 
          placeholder="Què has de fer avui?" 
          @keyup.enter="afegirTasca"
          id="input-nova-tasca"
        >
        <button @click="afegirTasca" id="boto-afegir">Afegir</button>
      </section>

      <!-- Llista de tasques -->
      <section class="seccio-llista">
        <div v-if="carregant" class="missatge-estat">Carregant tasques...</div>
        <div v-else-if="llistaTasques.length === 0" class="missatge-estat">No tens cap tasca encara. Comença escrivint-ne una!</div>
        
        <ul v-else class="llista-tasques">
          <li v-for="tasca in llistaTasques" :key="tasca.id" :class="['item-tasca', { 'feta': tasca.estat === 'feta' }]">
            <div class="tasca-info" @click="alternarEstatTasca(tasca)">
              <span class="checkbox"></span>
              <span class="text-tasca">{{ tasca.titol }}</span>
            </div>
            <button class="boto-eliminar" @click="eliminarTasca(tasca.id)" aria-label="Eliminar tasca">×</button>
          </li>
        </ul>
      </section>
    </main>

    <!-- Assistent IA Flotant -->
    <div :class="['assistent-ia', { 'obert': xatObert }]">
      <button class="boto-toggle-xat" @click="xatObert = !xatObert">
        {{ xatObert ? 'Tancar Assistent' : 'Preguntar a en Llumina' }}
      </button>
      
      <div v-if="xatObert" class="finestra-xat">
        <div class="historial-xat">
          <p v-if="respostaIA" class="resposta-ia">{{ respostaIA }}</p>
          <p v-else class="missatge-benvinguda">Hola! Soc en Llumina. En què et puc ajudar avui amb les teves tasques?</p>
        </div>
        
        <div class="controls-xat">
          <input 
            v-model="missatgeUsuari" 
            type="text" 
            placeholder="Escriu la teva consulta..." 
            @keyup.enter="preguntarIA"
            :disabled="consultantIA"
          >
          <button @click="preguntarIA" :disabled="consultantIA || !missatgeUsuari">
            {{ consultantIA ? '...' : 'Enviar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

/* Disseny Premium "Llumina" */
:root {
  --color-primari: #6366f1;
  --color-secundari: #4f46e5;
  --color-fons: #0f172a;
  --color-text: #f8fafc;
  --color-card: rgba(30, 41, 59, 0.7);
  --glass-border: rgba(255, 255, 255, 0.1);
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background: radial-gradient(circle at top left, #1e1b4b, #0f172a);
  color: var(--color-text);
  min-height: 100vh;
}

.contenidor-principal {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.capcalera {
  text-align: center;
  margin-bottom: 3rem;
}

.capcalera h1 {
  font-size: 3rem;
  margin: 0;
  background: linear-gradient(to right, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
}

.subtitol {
  color: #94a3b8;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

/* Formulari */
.seccio-nova-tasca {
  display: flex;
  gap: 0.5rem;
  background: var(--color-card);
  padding: 0.75rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
}

input[type="text"] {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;
}

#boto-afegir {
  background: var(--color-primari);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

#boto-afegir:hover {
  background: var(--color-secundari);
  transform: translateY(-1px);
}

/* Llista */
.llista-tasques {
  list-style: none;
  padding: 0;
}

.item-tasca {
  background: var(--color-card);
  margin-bottom: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

.item-tasca:hover {
  border-color: rgba(99, 102, 241, 0.4);
  transform: scale(1.01);
}

.tasca-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  flex: 1;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #64748b;
  border-radius: 50%;
  position: relative;
}

.feta .checkbox {
  background: #10b981;
  border-color: #10b981;
}

.feta .checkbox::after {
  content: '✓';
  color: white;
  font-size: 14px;
  position: absolute;
  top: -1px;
  left: 3px;
}

.feta .text-tasca {
  text-decoration: line-through;
  color: #64748b;
}

.boto-eliminar {
  background: transparent;
  color: #ef4444;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.boto-eliminar:hover {
  opacity: 1;
}

/* Assistent Flotant */
.assistent-ia {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 350px;
}

.boto-toggle-xat {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
  font-weight: 600;
}

.finestra-xat {
  background: #1e293b;
  width: 100%;
  height: 400px;
  margin-top: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  overflow: hidden;
}

.historial-xat {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  font-size: 0.95rem;
  line-height: 1.5;
}

.resposta-ia {
  background: rgba(99, 102, 241, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 3px solid var(--color-primari);
}

.controls-xat {
  display: flex;
  padding: 1rem;
  border-top: 1px solid var(--glass-border);
  gap: 0.5rem;
}

.controls-xat input {
  font-size: 0.9rem;
}

.controls-xat button {
  background: var(--color-primari);
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 480px) {
  .assistent-ia {
    width: calc(100% - 2rem);
    right: 1rem;
    left: 1rem;
  }
}
</style>
