import axios from 'axios';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = 'https://blog-supabase-five-dev.vercel.app/api/blog';
// DEV env
// const supabaseUrlDev = process.env.NEXT_PUBLIC_SUPABASE_URL_DEV;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseAxiosClient = axios.create({
  baseURL: supabaseUrl,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
});
