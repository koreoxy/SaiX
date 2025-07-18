import { writable } from 'svelte/store';
import { supabase } from '$lib';
import type { Session, User } from '@supabase/supabase-js';

export const session = writable<Session | null>(null);
export const user = writable<User | null>(null);

// Initialize session and user
supabase.auth.getSession().then(({ data: { session: s } }) => {
  session.set(s);
  user.set(s?.user ?? null);
});

// Listen for auth state changes
supabase.auth.onAuthStateChange((_event, s) => {
  session.set(s);
  user.set(s?.user ?? null);
});

export async function refreshSession() {
  const { data: { session: s } } = await supabase.auth.getSession();
  session.set(s);
  user.set(s?.user ?? null);
} 