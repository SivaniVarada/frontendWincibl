import React from 'react';
import FundCard from "./FundCard";
function HeroSection() {
  return (
    <div className="relative bg-blue-900 text-white">
      {/* Hero Container */}
      <div className="container mx-auto px-4 py-16">
        {/* Hero Content */}
        <div className="text-center">
          {/* Hero Image */}
          <img
            src="Img1"
            alt="Hero Image"
            className="mx-auto mb-8 rounded-full max-w-xs md:max-w-md"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to My Website</h1>
          <p className="text-lg md:text-xl mb-8">Your one-stop destination for amazing content.</p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-lg px-6 py-3 rounded-full">
            Learn More
          </button>
        </div>
      </div>
      {/* End Hero Container */}
    </div>
  );
}

export default HeroSection;
