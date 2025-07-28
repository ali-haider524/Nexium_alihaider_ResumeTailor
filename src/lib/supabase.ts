import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient('https://kqxopmmvxnetuqkuvytr.supabase.co','yeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxeG9tcG12eG5ldHVxa3V2eXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1Mjg0NzgsImV4cCI6MjA2OTEwNDQ3OH0.lZcDF1kULj2qI8D9sWRIWOyjf1U1Fdqrcd4G5Q0OfGk');


console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey);
