import { AddPostType } from '@/app/types';
import { supabaseAxiosClient } from '@/app/utils/supabaseAxiosClient';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const AddingController = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const postBlog = async ({ title, description }: AddPostType) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL!, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    return data;
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
