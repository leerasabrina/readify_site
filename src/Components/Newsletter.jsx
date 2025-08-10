import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './component.css'


const Newsletter = () => {
  const [email, setEmail] = useState('');
  

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      toast.error('Please enter a valid email!');
      return;
    }
    toast.success('Subscribed Successfully!');
    setEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto my-20 bg-slate-50 p-8 rounded-lg text-center  ">
      <h2 className="text-3xl fade-in-up font-bold mb-4">Subscribe to our Newsletter</h2>
      <p className="mb-6 text-gray-600">
        Get updates about  tasks directly in your inbox.
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col gap-2 md:flex-row  items-center justify-center">
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-md  border  border-gray-300 w-72"
          required
        />
        <button 
          type="submit"
          className="bg-orange-600 hover:bg-blue-400 text-white px-6 py-3  transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
