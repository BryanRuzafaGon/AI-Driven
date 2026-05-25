import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as esquema from '../database/schema';

// Inicialització de la connexió a la base de dades SQLite local
const sqlite = new Database('dades.db');

// Exportem la instància de Drizzle amb l'esquema en català carregat
export const bd = drizzle(sqlite, { schema: esquema });
