import { bd } from '../../utils/baseDeDades';
import { taulaTasques } from '../../database/schema';
import { eq } from 'drizzle-orm';

// Endpoint per actualitzar l'estat d'una tasca (pendent <-> feta)
export default defineEventHandler(async (event) => {
  const idTasca = getRouterParam(event, 'id');
  const cos = await readBody(event);

  if (!idTasca) {
    throw createError({
      statusCode: 400,
      statusMessage: 'L\'identificador de la tasca és necessari.',
    });
  }

  try {
    const resultat = await bd.update(taulaTasques)
      .set({ estat: cos.estat })
      .where(eq(taulaTasques.id, parseInt(idTasca)))
      .returning();

    if (resultat.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No s\'ha trobat la tasca especificada.',
      });
    }

    return resultat[0];
  } catch (error) {
    console.error('Error BD:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error en actualitzar la tasca.',
    });
  }
});
