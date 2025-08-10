import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Loader from '../loader/Loader';

const MyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('access-token');

        const res = await axios.get(`https://server-site-sigma-ashy.vercel.app/mybooks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
         
        });

        setBook(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details.');
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <Loader></Loader>;
  if (error) return <div className="p-5 text-red-600">{error}</div>;
  if (!book) return <div className="p-5">No book found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-2  bg-base-100 rounded shadow mt-6">
      <button
        className="btn btn-sm btn-outline mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="text-xl font-bold mb-4">{book.book_title}</h1>
      <img
        src={book.cover_photo}
        alt={book.book_title}
        className="h-[200px] w-[300px] max-w-sm rounded mb-6"
      />

      <p><strong>Author:</strong> {book.book_author}</p>
      <p><strong>Total Pages:</strong> {book.total_page}</p>
      <p><strong>Category:</strong> {book.book_category}</p>
      <p><strong>Status:</strong> {book.reading_status}</p>
      <p className="mt-4"><strong>Overview:</strong></p>
      <p className="whitespace-pre-wrap w-[600px]">{book.book_overview}</p>
    </div>
  );
};

export default MyDetails;
