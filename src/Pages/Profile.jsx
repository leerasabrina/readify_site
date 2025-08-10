import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../Contexts/AuthContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE'];

const Profile = () => {
  const {user}=useContext(AuthContext);
   
  const [books, setBooks] = useState([]);
 
 
    useEffect(() => {
        const fetchBooks = async () => {
          if (user?.email) {
            const token = await user.getIdToken();
    
            axios.get(`https://server-site-sigma-ashy.vercel.app/books/user?email=${user.email}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            })
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
          }
        };
    
        fetchBooks();
      }, [user]);

  const categoryCounts = books.reduce((acc, book) => {
    acc[book.book_category] = (acc[book.book_category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  const totalBooks = books.length;

  return (
    <div className=" max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <img src={user?.photoURL} alt="profile" className="w-20 h-20 rounded-full object-cover" />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2"> Bookshelf Summary</h3>
        <p>Total Books: <span className="font-bold">{totalBooks}</span></p>
        <ul className="list-disc ml-6 mt-2">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <li key={cat}>{cat}: {count}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Books by Category</h3>
        {chartData.length > 0 ? (
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>No books added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
