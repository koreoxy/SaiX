import { dev } from '$app/environment';

export const title = 'SaiX';
export const description = 'My 3D Portfolio Sai - Koreoxy';
export const url = dev ? 'http://localhost:5173' : 'https://saix-topaz.vercel.app';

// Supabase configuration from environment variables
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
