const HomeController = () => {
  const fetchAllPosts = async () => {
    const res = await fetch('http://localhost:3000/api/blog', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data.data;
  };

  return { fetchAllPosts };
};

export default HomeController;
