import React from 'react';
import { FaFacebookF,FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { PiBookOpenDuotone } from "react-icons/pi";
import './component.css';
import { Link } from 'react-router';



const Footer = () => {
    return (
      <footer className="bg-slate-800 text-white py-10 mt-16">
      <div className="max-w-6xl space-y-8 mx-auto px-4 grid grid-cols-1 md:grid-cols-4 md:gap-20">
        <div>
          <p><PiBookOpenDuotone size={40} color='#f74b00'/></p>
         <h1 className="lg:flex text-white hidden text-3xl font-bold">
                     
                     Readi<span className='text-orange-600'>fy</span>
                   </h1>
        </div>
        
        <div>
          <h1 className="text-xl font-semibold mb-4">Contact Us</h1>
          <p className="flex items-center gap-2 mb-2"><FaMapMarkerAlt /> Dhaka, Bangladesh</p>
          <p className="flex  items-center gap-2 mb-2"><FaPhoneAlt /> +880 1234-567890</p>
          <p className="flex  items-center gap-2"><FaEnvelope /> support@readify.com</p>
        </div>

       
        <div>
          <h1 className="text-xl font-semibold mb-4">Legal</h1>
          <ul>
           <li className="mb-2  hover:text-blue-400 cursor-pointer"><Link to={'/terms'} className='custom-size'>Terms & Conditions</Link></li> 
            <li className="hover:text-blue-400 cursor-pointer"><Link to={'/privacy'} className='custom-size'>Privacy and Policy</Link></li>
          </ul>
        </div>

        <div>
          <h1 className="text-xl font-semibold mb-4">Follow Us</h1>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 a"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 a"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 a"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Virtual Book Shop. All rights reserved.
      </div>
    </footer>
    );
};

export default Footer;