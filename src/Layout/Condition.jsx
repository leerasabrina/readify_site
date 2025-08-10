import React, { useEffect, useState } from 'react';

import { Outlet, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Loader from '../loader/Loader';


const Condition = () => {
    const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); 

    return () => clearTimeout(timer);
  }, [location.pathname]);


    return (
        <div className='min-h-screen'>
        
      {loading 
  ? <div style={{ minHeight: "calc(100vh - 200px)" }}><Loader /></div> 
  : <Outlet />
}
        {/* {loading ? <Loader /> : <Outlet />} */}
      
       <ToastContainer position="top-center" autoClose={2000} />
       
        
        </div>
    );
};

export default Condition;