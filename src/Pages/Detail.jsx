import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";

const Detail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`https://server-site-sigma-ashy.vercel.app/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error("Review text cannot be empty");
      return;
    }

    const payload = {
      book_id: id,
      text: reviewText,
      user_name: "Anonymous",
      user_email: "anonymous@example.com",
    };

    const url = isEditing
      ? `https://server-site-sigma-ashy.vercel.app/reviews/${editingReviewId}`
      : `https://server-site-sigma-ashy.vercel.app/reviews`;

    const method = isEditing ? axios.patch : axios.post;

    try {
      await method(url, payload);
      setReviewText('');
      setIsEditing(false);
      setEditingReviewId(null);
      fetchReviews();
      toast.success(isEditing ? "Review updated" : "Review posted");
    } catch (err) {
      console.error("Failed to submit review", err);
      toast.error("Failed to submit review");
    }
  };

  const startEdit = (review) => {
    setReviewText(review.text);
    setIsEditing(true);
    setEditingReviewId(review._id);
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`https://server-site-sigma-ashy.vercel.app/reviews/${id}`);
      fetchReviews();
      toast.success("Review deleted");
    } catch (err) {
      console.error("Failed to delete review", err);
      toast.error("Failed to delete review");
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://server-site-sigma-ashy.vercel.app/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Error loading book detail:", err);
      }
    };
    fetchBook();
  }, [id]);

  const handleStatusUpdate = async () => {
    let newStatus = "";
    if (book.reading_status === "Want-to-Read") newStatus = "Reading";
    else if (book.reading_status === "Reading") newStatus = "Read";
    else return toast.info("Book already marked as Read");

    try {
      const res = await axios.patch(`https://server-site-sigma-ashy.vercel.app/books/status/${book._id}`, {
        reading_status: newStatus
      });
      if (res.data.success) {
        setBook(prev => ({ ...prev, reading_status: newStatus }));
        toast.success("Status updated to " + newStatus);
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error("Status update error", err);
      toast.error("Something went wrong");
    }
  };

  const handleUpvote = async () => {
    try {
      const res = await axios.patch(`https://server-site-sigma-ashy.vercel.app/books/upvote/${book._id}`, {});
      if (res.data.success) {
        setBook(prev => ({ ...prev, upvote: res.data.upvote }));
        toast.success("Upvoted!");
      } else {
        toast.error(res.data.message || "Upvote failed");
      }
    } catch (err) {
      console.error("Upvote failed", err);
      toast.error("Something went wrong!");
    }
  };

  if (!book) return <p className="text-center mt-10"><Loader /></p>;

  return (
    <div className=" max-w-7xl mx-auto">
      <img src={book.cover_photo} alt={book.book_title} className=" h-[200px] w-[500px] object-fill rounded-lg mb-4" />
      <h2 className="text-3xl font-bold mb-2">{book.book_title}</h2>
      <p className="text-gray-600 mb-2"><strong>Author:</strong> {book.book_author}</p>
      <p className="text-gray-600 mb-2"><strong>Total Pages:</strong> {book.total_page}</p>
      <p className="text-gray-600 mb-2"><strong>Category:</strong> {book.book_category}</p>

      <p className="text-gray-600 mb-2"><strong>Status:</strong> {book.reading_status}</p>

      {book.reading_status !== "Read" && (
        <button
          onClick={handleStatusUpdate}
          className="mb-4 px-4 py-2 rounded bg-purple-600 text-white"
        >
          Mark as {book.reading_status === "Want-to-Read" ? "Reading" : "Read"}
        </button>
      )}

      <p className="text-gray-600 mb-2"><strong>Added by:</strong> {book.user_name} ({book.user_email})</p>
      <p className="text-gray-600 mt-4"><strong>Overview:</strong> {book.book_overview}</p>

      <button
        onClick={handleUpvote}
        className="mt-4 px-4 py-2 rounded bg-green-600 text-white"
      >
        Upvote
      </button>
      <p className="text-green-600 mt-1 font-semibold">Upvotes: {book.upvote}</p>

      {/* Reviews */}
      <div className="mt-8 space-y-4">
        <h3 className="text-2xl font-bold">Reviews</h3>

        {reviews.map((r) => (
          <div key={r._id} className="bg-gray-100 p-3 rounded shadow">
            <p className="text-sm text-gray-800"><strong>{r.user_name}</strong>: {r.text}</p>
            <div className="flex gap-2 mt-1">
              <button onClick={() => startEdit(r)} className="text-blue-600 text-sm">Edit</button>
              <button onClick={() => deleteReview(r._id)} className="text-red-600 text-sm">Delete</button>
            </div>
          </div>
        ))}

        {/* Post Review */}
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Write your review..."
          />
          <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
            {isEditing ? 'Update Review' : 'Post Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Detail;
