import { AddPostType } from '@/app/types';
import { supabase } from '@/app/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const AddingController = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const postBlog = async ({ title, description }: AddPostType) => {
    const res = await supabase.from('Post').insert([{ title, description }]);
    if (res.status !== 200 || res.data === null) {
      return {
        status: 400,
        data: null,
        message: `Error ${res.error}`,
      };
    }

    return {
      status: 200,
      data: res.data,
      message: 'Post created successfully.',
    };

    // const res = await fetch('http://localhost:3000/api/blog', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/lson',
    //   },
    //   body: JSON.stringify({ title, description }),
    // });

    // return res.json;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('Posting now ... ', { id: '1' });
    await postBlog({
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
    });
    toast.success('Success Posting !', { id: '1' });

    router.push('/');
    router.refresh();
  };

  return {
    titleRef,
    descriptionRef,
    handleSubmit,
  };
};

export default AddingController;
