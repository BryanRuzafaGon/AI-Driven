import { bd } from '../../utils/baseDeDades';
import { taulaTasques } from '../../database/schema';
import { eq } from 'drizzle-orm';

// Endpoint per eliminar una tasca de la base de dades
export default defineEventHandler(async (event) => {
  const idTasca = getRouterParam(event, 'id');

  if (!idTasca) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Falta l\'ID de la tasca a eliminar.',
    });
  }

  try {
    const resultat = await bd.delete(taulaTasques)
      .where(eq(taulaTasques.id, parseInt(idTasca)))
      .returning();

    if (resultat.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'La tasca no existeix o ja ha estat eliminada.',
      });
    }

    return { missatge: 'Tasca eliminada correctament.' };
  } catch (error) {
    console.error('Error BD:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error intern en intentar esborrar la tasca.',
    });
  }
});
