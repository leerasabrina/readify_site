import { useEffect, useState } from "react";
import axios from "axios";
import './page.css';

const Categories = () => {
  const [groupedBooks, setGroupedBooks] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://server-site-sigma-ashy.vercel.app/books");
        const data = res.data;
        const grouped = data.reduce((acc, book) => {
          const category = book.book_category || "Others";
          if (!acc[category]) acc[category] = [];
          acc[category].push(book);
          return acc;
        }, {});
        setGroupedBooks(grouped);
        // Default select first category
        const firstCategory = Object.keys(grouped)[0] || null;
        setSelectedCategory(firstCategory);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  const categories = Object.keys(groupedBooks);

  return (
    <div className="my-20 lg:px-4 max-w-7xl mx-auto rounded-lg shadow-2xl lg:p-10 flex gap-6">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer p-2 rounded mb-2 ${
                selectedCategory === category ? "bg-orange-500 text-white" : "hover:bg-blue-200"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Books list */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6">{selectedCategory || "No Category Selected"}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {selectedCategory && groupedBooks[selectedCategory]?.map((book) => (
            <div
              key={book._id}
              className="hover:scale-105 transition mb-4 p-4 rounded-lg shadow fade-in-up"
            >
              <div className="h-32 w-full mb-3 overflow-hidden rounded-md">
                <img
                  src={book.cover_photo}
                  alt={book.book_title}
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold">{book.book_title}</h4>
              <p className="text-sm">Author: {book.book_author}</p>
              <p className="text-sm">Upvotes: {book.upvote || 0}</p>
            </div>
          ))}
          {!selectedCategory && <p>No books to display</p>}
        </div>
      </div>
    </div>
  );
};

export default Categories;
