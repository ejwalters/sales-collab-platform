import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lksuijcttcddtosrvlkf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrc3VpamN0dGNkZHRvc3J2bGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NDgwMjgsImV4cCI6MjA1MjIyNDAyOH0.sf35_pBsX7oorDoa27pSNrSqbphmQsjdt8aWa0UIHGs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
