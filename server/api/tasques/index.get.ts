import { bd } from '../../utils/baseDeDades';
import { taulaTasques } from '../../database/schema';

// Endpoint per obtenir totes les tasques guardades
export default defineEventHandler(async (event) => {
  try {
    const llistaTasques = await bd.select().from(taulaTasques).all();
    return llistaTasques;
  } catch (error) {
    console.error('Error BD:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'No s\'han pogut recuperar les tasques.',
    });
  }
});
