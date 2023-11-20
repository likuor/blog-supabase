import { supabaseAxiosClient } from './utils/supabaseAxiosClient';

const fetchAllPosts = async () => {
  const res = await supabaseAxiosClient.get('');
  return res.data;
};

export default fetchAllPosts;
