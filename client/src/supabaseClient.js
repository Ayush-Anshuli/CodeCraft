import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gcrkhmzfspsqntlmbssk.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcmtobXpmc3BzcW50bG1ic3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTQyMjEsImV4cCI6MjA0ODg5MDIyMX0.mQ9u_b7BmQtkeKUdTNZmAsIn6w6303LsApef-tmGMMM'; // Replace with your Supabase Anon Key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
