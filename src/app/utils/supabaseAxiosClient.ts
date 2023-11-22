import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// DEV env
// const supabaseUrlDev = process.env.NEXT_PUBLIC_SUPABASE_URL_DEV;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseAxiosClient = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
});
