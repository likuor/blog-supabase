const HomeController = () => {
  const fetchAllPosts = async () => {
    const res = await fetch(
      'https://blog-supabase-five-dev.vercel.app/api/blog',
      {
        cache: 'no-store',
      }
    );
    const data = await res.json();
    return data.data;
  };

  return { fetchAllPosts };
};

export default HomeController;
