import React from 'react';
import Contact from '../../components/Contact/Contact';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Sslider from '../../components/Slider/Sslider';
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import './Home.scss';
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import CategoriesSlider from '../../components/CategoriesSlider/CategoriesSlider';


const Home = () => {
  return (
    <div className="home">
      <div className="header">
        <SideNavbar />
        <Sslider />
      </div>
      <FeaturedProducts type="featured" />
      <HowItWorks/>
      <CategoriesSlider />
      <FeaturedProducts type="trending" />
      <Contact />
    </div>
  );
};

export default Home;
