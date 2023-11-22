import { supabaseAxiosClient } from './utils/supabaseAxiosClient';

const HomeController = () => {
  const fetchAllPosts = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL!, {
      cache: 'no-store',
    });

    const data = await res.json();
    return data.data;
    // const res = await supabaseAxiosClient.get('');
    // return res.data;
  };

  return { fetchAllPosts };
};

export default HomeController;
