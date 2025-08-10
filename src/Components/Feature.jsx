import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "../Contexts/AuthContext";

const Feature = () => {
  const [books, setBooks] = useState([]); 
  

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      
      // const user = auth.currentUser;
      // const token = user && (await user.accessToken);

      try {
        const res = await axios.get("https://server-site-sigma-ashy.vercel.app/books/featured");
        setBooks(res.data); 
        console.log(res.data)
      } catch (error) {
        console.error("Failed to fetch featured books", error);
  console.log("Error details:", error?.response?.data);
      }
    };

    
        fetchFeaturedBooks();
    
  }, []);

  return (
    <div className="my-20 max-w-7xl mx-auto ">
      <h2 className="text-3xl fade-in-up text-orange-600 text-center font-bold mb-4"> Popular Books</h2>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book._id} className=" p-4 rounded-lg shadow-2xl hover:scale-105 transition">
            <img src={book.cover_photo} alt={book.book_title} className="w-full h-32 object-cover rounded" />
            <h3 className="mt-2 text-lg font-semibold">{book.book_title}</h3>
            <p className="text-sm">By {book.book_author}</p>
            <p className="text-sm text-gray-500">Upvotes: {book.upvote || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
