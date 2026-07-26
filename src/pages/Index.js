import React from "react";
import Navbar from "../components/Navbar";
import HeroSearch from "../components/HeroSearch";
import PopularDestinations from "../components/PopularDestinations";
import ExclusiveDeals from "../components/ExclusiveDeals";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/Whychooseus";

const Index = () => (
  <div className="d-flex flex-column min-vh-100">
    <Navbar />
    <HeroSearch />
    <PopularDestinations />
    <ExclusiveDeals />
    <WhyChooseUs/>
    <Footer />
  </div>
);

export default Index;
