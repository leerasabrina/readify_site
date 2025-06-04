import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    const bookData = {
      ...data,
      user_email: user.email,
      user_name: user.displayName,
      upvote: 0,
      total_page: parseInt(data.total_page), 
    };

    axiosSecure.post('/books', bookData)
      .then((res) => {
        console.log('Book added:', res.data);
        toast.success("Book added successfully!");
        reset();
      })
      .catch(err => {
        toast.error("Failed to add book.");
        console.error('Error adding book:', err.response || err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-orange-600/50 p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("book_title")} placeholder="Book Title" className="input input-bordered w-full" required />
        
        <input {...register("cover_photo")} placeholder="Cover Photo URL" className="input input-bordered w-full" required />
        
        <input {...register("total_page", { valueAsNumber: true })} type="number" placeholder="Total Pages" className="input input-bordered w-full" required />
        
        <input {...register("book_author")} placeholder="Author Name" className="input input-bordered w-full" required />

        <input {...register("user_email")} defaultValue={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />
        <input {...register("user_name")} defaultValue={user?.displayName} readOnly className="input input-bordered w-full bg-gray-100" />

        <select {...register("book_category")} className="select select-bordered w-full" required>
          <option value="">Select Category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
        </select>

        <select {...register("reading_status")} className="select select-bordered w-full" required>
          <option value="">Select Reading Status</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Want-to-Read">Want-to-Read</option>
        </select>

        <textarea {...register("book_overview")} placeholder="Book Overview" className="textarea textarea-bordered w-full" required />

        <label className="block text-sm font-medium text-gray-700">Upvote</label>
        <input {...register("upvote")} defaultValue={0}  readOnly className="input input-bordered w-full bg-gray-100" />

        <button type="submit" className="btn bg-black text-white w-full">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
