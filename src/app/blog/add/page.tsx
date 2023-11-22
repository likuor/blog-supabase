"use client"
import { Toaster } from 'react-hot-toast';
import AddingController from './controller';

const AddPost = () => {
  const {
    titleRef,
    descriptionRef,
    handleSubmit,
  } = AddingController()

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">Add a new blog 🚀</p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Type title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="Type content"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  )
};

export default AddPost;
