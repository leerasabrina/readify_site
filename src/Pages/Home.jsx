import React from 'react';
import Banner from '../Components/Banner';
import Feature from '../Components/Feature';
import Newsletter from '../Components/Newsletter';
import Category from './Category';
import Readify from '../Components/Readify';

const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <Feature></Feature>
           <Category></Category>
           <Readify></Readify>
           <Newsletter></Newsletter>
        </div>
    );
};

export default Home;