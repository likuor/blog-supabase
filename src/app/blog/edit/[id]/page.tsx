"use client"
import { EditPostType, GetBlogByIdType } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';

const editBlog = async ({ title, description, id }: EditPostType) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: 'put',
    headers: {
      "Content-Type": "application/lson"
    },
    body: JSON.stringify({ title, description, id }),
  })

  return res.json
}

const getBlogById = async ({ id }: GetBlogByIdType) => {
  const getBlog = await fetch(`http://localhost:3000/api/blog/${id}`)
  const res = await getBlog.json()
  return res.data
}

const EditPost = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.loading('Editing now ... ', { id: '1' })
    await editBlog({
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      id: params.id
    })
    toast.success('Success Editing !', { id: '1' })

    router.push('/')
    router.refresh()
  }


  useEffect(() => {

    getBlogById({ id: params.id }).then((data) => {
      console.log(data);
      if (titleRef.current && descriptionRef.current) {
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description
      }
    }).catch((error) => {
      toast.error('Error', { id: '1' })
    })
  }, [])


  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              更新
            </button>
            <button className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;
