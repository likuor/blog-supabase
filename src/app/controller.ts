import { supabaseAxiosClient } from './utils/supabaseAxiosClient';

const HomeController = () => {
  const fetchAllPosts = async () => {
    const res = await fetch(
      'https://blog-supabase-five-dev.vercel.app/api/blog',
      {
        // const res = await fetch('http://localhost:3000/api/blog', {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    return data.data;
    // const res = await supabaseAxiosClient.get('');
    // return res.data;
  };

  return { fetchAllPosts };
};

export default HomeController;
