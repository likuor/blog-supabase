import { DeleteBlogByIdType, EditPostType, GetBlogByIdType } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const EditingController = (id: number) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const editBlog = async ({ title, description, id }: EditPostType) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/lson',
      },
      body: JSON.stringify({ title, description, id }),
    });

    return res.json;
  };

  const getBlogById = async ({ id }: GetBlogByIdType) => {
    const getBlog = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/${id}`);
    const res = await getBlog.json();
    return res.data;
  };

  const deleteBlog = async ({ id }: DeleteBlogByIdType) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/lson',
      },
    });

    return res.json;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('Editing now ... ', { id: '1' });
    await editBlog({
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      id,
    });
    toast.success('Success Edit !', { id: '1' });

    router.push('/');
    router.refresh();
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('Deleting now ... ');
    await deleteBlog({ id });
    toast.success('Success Delete !', { id: '1' });

    router.push('/');
    router.refresh();
  };

  return {
    getBlogById,
    titleRef,
    descriptionRef,
    handleSubmit,
    handleDelete,
  };
};

export default EditingController;
