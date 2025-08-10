import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
           
        axios
          .get("https://server-site-sigma-ashy.vercel.app/books")
          .then((res) => {
            setBooks(res.data);
            setFilteredBooks(res.data);
          })
          .catch((err) => {
            console.error("Error fetching books:", err);
          });
      
    };
    fetchBooks();
  }, []);


  useEffect(() => {
    const lowerSearch = searchQuery.toLowerCase();
    const filtered = books.filter((book) => {
      const matchesSearch =
        book.book_title.toLowerCase().includes(lowerSearch) ||
        book.book_author.toLowerCase().includes(lowerSearch);
      const matchesStatus = statusFilter
        ? book.reading_status === statusFilter
        : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredBooks(filtered);
  }, [searchQuery, statusFilter, books]);

  return (
    <div className=" max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Bookshelf</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-1/4"
        >
          <option value="">All Status</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Want-to-Read">Want-to-Read</option>
        </select>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl space-y-2 shadow-md p-4"
          >
            <img
              src={book.cover_photo}
              alt={book.book_title}
              className="h-32 w-full object-cover rounded-md mb-2"
            />
           {/*  <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{book.book_title}</h3>
              <p className="text-green-600 font-semibold">
                Upvotes: {book.upvote}
              </p>
            </div> */}
            <p>
              <strong>Author:</strong> {book.book_author}
            </p>
            <p>
              <strong>Category:</strong> {book.book_category}
            </p>
            <p>
              <strong>Status:</strong> {book.reading_status}
            </p>
            <Link to={`/bookshelf/${book._id}`}>
              <button className="btn text-white bg-orange-500">
                See More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
