import React from 'react';
import './component.css'

const Readify = () => {
   
       
           return (
    <section className="bg-gray-50 max-w-7xl mx-auto rounded-lg py-10 px-4 md:px-20 text-center">
      <h2 className="text-3xl fade-in-left font-bold text-orange-600 mb-6">Why Readify?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl fade-in-left font-semibold mb-2">Curated Content</h3>
          <p className="text-gray-700">All books and articles are reviewed and rated by the community to ensure quality.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl fade-in-left font-semibold mb-2">Upvote System</h3>
          <p className="text-gray-700">The most helpful resources rise to the top based on user upvotes.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl fade-in-left font-semibold mb-2">Track Your Reading</h3>
          <p className="text-gray-700">Easily manage your bookshelf and keep track of what you've read and what's next.</p>
        </div>
      </div>
    </section>
  );  
       
    
};

export default Readify;