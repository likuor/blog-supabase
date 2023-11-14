"use client"
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import EditingController from './controller';


const EditPost = ({ params }: { params: { id: number } }) => {
  const {
    getBlogById,
    titleRef,
    descriptionRef,
    handleSubmit,
    handleDelete
  } = EditingController(params.id)

  useEffect(() => {
    getBlogById({ id: params.id }).then((data) => {
      if (titleRef.current && descriptionRef.current) {
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description
      }
    }).catch((error) => {
      console.error(error)
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
            <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;
