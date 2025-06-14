import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase.init";
import './page.css'



const Category = () => {
  const [groupedBooks, setGroupedBooks] = useState({});
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = await auth.currentUser.
        accessToken;
        // console.log(auth.currentUser)

        const res = await axios.get("https://server-site-sigma-ashy.vercel.app/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
       

       
        const grouped = data.reduce((acc, book) => {
          const category = book.book_category || "Others";
          if (!acc[category]) acc[category] = [];
          acc[category].push(book);
          return acc;
        }, {});

        setGroupedBooks(grouped);
      } catch (err) {
        console.error(err);
        
       
      }
    };

    fetchBooks();
  }, []);

  const categoryOrder = ["Fiction", "Non-Fiction", "Fantasy"]; 
  const categoryColors = {
    Fiction: "bg-blue-100",
    "Non-Fiction": "bg-green-100",
    Fantasy: "bg-purple-100",
    Others: "bg-gray-100"
  };

  return (
    <div className="my-20 lg:px-4 max-w-7xl mx-auto shadow-2xl lg:p-10">
     

      <div className="grid md:grid-cols-3 gap-6">
        {categoryOrder.map((category) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4 text-center btn w-[400px] border-2 border-orange-600  pb-2">
              {category}
            </h3>
            {groupedBooks[category]?.map((book) => (
              <div
              key={book._id}
              className={`mb-4 p-4 rounded-lg fade-in-up shadow ${categoryColors[category] || categoryColors["Others"]}`}
            >
              <div className="h-48 w-full mb-3 overflow-hidden rounded-md">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
