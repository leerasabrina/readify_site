import React from 'react';
import Banner from '../Components/Banner';
import Feature from '../Components/Feature';
import Newsletter from '../Components/Newsletter';
import Readify from '../Components/Readify';
import Categories from './Categories';
import Faq from './Faq';
import NewBooks from './NewBooks';


const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <Feature></Feature>
           <Categories></Categories>
           <NewBooks></NewBooks>
           <Readify></Readify>
           <Faq></Faq>
           <Newsletter></Newsletter>
        </div>
    );
};

export default Home;