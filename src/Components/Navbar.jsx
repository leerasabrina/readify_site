import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import './component.css';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../loader/Loader';
import { PiBookOpenDuotone } from 'react-icons/pi';



const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className= "bg-slate-100/50 text-black navbar sticky top-0 z-10">
      <div className="navbar-start w-[170px] md:w-1/2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3  w-52 shadow">
           
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li>
              <NavLink to={'/bookshelf'}>Bookshelf</NavLink>

            </li>
            <li><NavLink to={'/addbook'}>Add Book</NavLink></li>
            <li><NavLink to={'/mybooks'}>My Books</NavLink></li>
            <li><NavLink to={'/profile'}>Profile</NavLink></li>
          </ul>
        </div>
{/*  Bookshelf | Add Book (🔒) | My Books (🔒) | Profile (🔒)
 */}
        {/* logo */}

        <h2 className=" lg:flex hidden text-3xl font-bold  "><PiBookOpenDuotone size={40} color='#f74b00'/>Readi<span className='text-orange-600'>fy</span></h2>


      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  color">
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li>
              <NavLink to={'/bookshelf'}>Bookshelf</NavLink>

            </li>
            <li><NavLink to={'/addbook'}>Add Book</NavLink></li>
            <li><NavLink to={'/mybooks'}>My Books</NavLink></li>
            <li><NavLink to={'/profile'}>Profile</NavLink></li>
        </ul>
      </div>
{/* end */}
      <div className="navbar-end space-x-2">

        {loading && (
          <div className= "bg-white text-black">
            <Loader></Loader>

          </div>
        )}

        {user && user.photoURL && (
          <div className="relative group">
            <div
              className="w-10 h-10 rounded-full border-2 border-blue-600 cursor-pointer"
              title={user.displayName}
              onClick={()=>setShow(!show)}
            >
              <img
                src={user.photoURL}
                alt="user"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            

            <div className='absolute right-0 mt-2 w-56 rounded-lg  shadow-lg p-4 z-50 bg-white    invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 '>
              <p><strong>Name:</strong> {user.displayName}</p>
              <button
                onClick={handleLogout}
                className="mt-2 btn btn-sm bg-red-100 text-red-700"
              >
                Logout
              </button>
            </div>
           
            {show && (
              <div className="absolute bg-amber-700 right-0 mt-2 w-56 rounded-lg shadow-lg p-4 z-50  md:hidden transition-all duration-300">
              <p><strong>Name:</strong> {user.displayName}</p>
              <button
                onClick={handleLogout}
                className="mt-2 btn btn-sm bg-red-100 text-red-700"
              >
                Logout
              </button>
            </div>

            )}
            
          </div>
        )}



        {!user && (
          <>
            <Link to={'/signup'} className="btn w-[120px] bg-orange-600  text-white text-lg">Sign Up</Link>
            <Link to="/signin" className="btn bg-orange-600 w-[120px] text-white text-lg">
              Sign In
            </Link></>
        )}

        
        {/* sesh */}
      </div>
    </div>
  );
};

export default Navbar;