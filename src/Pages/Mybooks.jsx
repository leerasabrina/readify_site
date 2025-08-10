import { useContext, useEffect, useState } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";

const MyBooks = () => {
 
  const [myBooks, setMyBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {user} =useContext(AuthContext);
  const navigate=useNavigate();


  useEffect(() => {
    const fetchBooks = async () => {
      if (user?.email) {
         const token = localStorage.getItem('access-token');

        axios.get(`https://server-site-sigma-ashy.vercel.app/mybooks?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
          .then(res => setMyBooks(res.data))
          .catch(err => console.error(err));
      }
    };

    fetchBooks();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      
 const token = localStorage.getItem('access-token');
      axios.delete(`https://server-site-sigma-ashy.vercel.app/mybooks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(res => {
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Your book has been deleted.', 'success');
            setMyBooks(myBooks.filter(book => book._id !== id));
          }
        })
        .catch(err => {
          Swal.fire('Error!', 'Failed to delete book.', 'error');
          console.error(err);
        });
    }
  };
  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };




  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {myBooks.map(book => (
          <div key={book._id} className="card bg-base-100 shadow-sm ">
           <img src={book.cover_photo} alt={book.book_title} className="w-full h-32 object-cover rounded-lg " />
            <div className="card-body p-2">
              <h2 className="text-xl font-bold ">{book.book_title}</h2>
              <p className="text-sm text-gray-600">Author : {book.book_author}</p>
              <p className="text-gray-600 "><strong>Total Pages:</strong> {book.total_page}</p>
              <p className="text-gray-600 "><strong>Category:</strong> {book.book_category}</p>
              <p className="text-gray-600 mb-2"><strong>Status:</strong> {book.reading_status}</p>
              {/* <p className="text-sm">{book.book_overview}</p> */}
              <div className="card-actions justify-start mt-3">
                <button onClick={() =>navigate(`/details/${book._id}`)} className="btn btn-success">Details</button>
                <button onClick={() => handleEdit(book)} className="btn btn-warning">Edit</button>

                <button onClick={() => handleDelete(book._id)} className="btn btn-error ">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <h2 className="text-xl font-bold mb-4">Update Book</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;

              const updatedBook = {
                book_title: form.title.value,
                book_author: form.author.value,
                cover_photo: form.cover.value,
                total_page: parseInt(form.page.value),
                book_category: form.category.value,
                reading_status: form.status.value,
                book_overview: form.overview.value,
              };

            const token = localStorage.getItem('access-token');

              axios.put(`https://server-site-sigma-ashy.vercel.app/mybooks/${selectedBook._id}`, updatedBook, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              })
                .then(res => {
                  if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", "Book updated successfully", "success");
                    const updatedList = myBooks.map(book =>
                      book._id === selectedBook._id ? { ...book, ...updatedBook } : book
                    );
                    setMyBooks(updatedList);
                    setShowModal(false);
                  }
                })
                .catch(err => {
                  Swal.fire("Error!", "Failed to update book", "error");
                  console.error(err);
                });
            }}>
              <input className="input input-bordered w-full mb-2" name="title" defaultValue={selectedBook.book_title} required />
              <input className="input input-bordered w-full mb-2" name="author" defaultValue={selectedBook.book_author} required />
              <input className="input input-bordered w-full mb-2" name="cover" defaultValue={selectedBook.cover_photo} required />
              <input className="input input-bordered w-full mb-2" name="page" defaultValue={selectedBook.total_page} required />
              <input className="input input-bordered w-full mb-2" name="category" defaultValue={selectedBook.book_category} required />
              <select name="status" className="select select-bordered w-full mb-2" defaultValue={selectedBook.reading_status}>
                <option>Read</option>
                <option>Currently Reading</option>
                <option>Want to Read</option>
              </select>
              <textarea className="textarea textarea-bordered w-full mb-2" name="overview" defaultValue={selectedBook.book_overview} required />
              <div className="flex justify-end gap-2">
                <button type="submit" className="btn btn-primary">Update</button>
                <button onClick={() => setShowModal(false)} type="button" className="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>

  );
};

export default MyBooks;
