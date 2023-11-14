"use client"
import { AddPostType } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';

const postBlog = async ({ title, description }: AddPostType) => {
  const res = await fetch('http://localhost:3000/api/blog', {
    method: 'post',
    headers: {
      "Content-Type": "application/lson"
    },
    body: JSON.stringify({ title, description }),
  })

  return res.json
}

const AddPost = () => {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.loading('Posting now ... ', { id: '1' })
    await postBlog({ title: titleRef.current?.value, description: descriptionRef.current?.value })
    toast.success('Success Posting !', { id: '1' })

    router.push('/')
    router.refresh()
  }

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
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
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  )
};

export default AddPost;
