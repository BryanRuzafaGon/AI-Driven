import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Definició de la taula de tasques segons l'especificació SPEC.md
export const taulaTasques = sqliteTable('tasques', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titol: text('titol').notNull(),
  descripcio: text('descripcio'),
  estat: text('estat').default('pendent'), // Valors possibles: 'pendent', 'feta'
  creatEl: integer('creat_el', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
