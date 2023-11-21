import { supabaseAxiosClient } from './utils/supabaseAxiosClient';

const HomeController = () => {
  const fetchAllPosts = async () => {
    const res = await supabaseAxiosClient.get('');
    return res.data;
  };

  return { fetchAllPosts };
};

export default HomeController;
