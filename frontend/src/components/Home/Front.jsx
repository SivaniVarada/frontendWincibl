import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assets/home/bg1.png";
import img2 from "../../assets/home/bg2.png";
import img3 from "../../assets/home/bg3.png";
import img4 from "../../assets/home/bg4.png";


export default function Front() {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <section className="z-10">
      <div className="sm:w-11/12 mx-auto ">
        <Carousel
          showArrows={true} // You can customize carousel settings as needed
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          pagination={false}
        
        >
          <div>
            <img
              src={img1}
              alt="Image 1"
              className="w-full h-[620px] object-cover"
            />
          </div>
          <div>
            <img
              src={img2}
              alt="Image 2"
              className="w-full h-[620px] object-cover"
            />
          </div>
          <div>
            <img
              src={img3}
              alt="Image 2"
              className="w-full h-[620px] object-cover"
            />
          </div>
          <div>
            <img
              src={img4}
              alt="Image 2"
              className="w-full h-[620px] object-cover"
            />
          </div>
          {/* Add more images as needed */}
        </Carousel>
      </div>
    </section>
  );
}

