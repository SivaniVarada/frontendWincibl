import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import random from "../../assets/random.png";

const NewsCard = ({ text }) => (
  <div className="w-[320px] px-4 py-6 bg-white rounded-md news_card_shadow">
    <p className="text-[#5B6469] font-bold text-[15px]">{text} </p>
    <div className="pt-7 text-[13px] flex items-center gap-2">
      <img src={random} alt="person" className="w-10 h-10 rounded-full" />
      <div>
        <h1 className="font-medium">Arjun Krishna</h1>
        <p className="text-[#BFBFC8]">@arjunkrishna22</p>
      </div>
    </div>
  </div>
);

export default function Stories() {
  return (
    <section className="mx-18">
      <Container>
        <div className="pt-14 pb-4 h-[700px] overflow-auto bg-[#F7F7F7] flex items-center lg:flex-nowrap flex-wrap gap-1">
          <article className="lg:w-1/2 w-full lg:pb-0 pb-4 flex flex-col lg:items-start items-center lg:ml-10 lg:mt-20">
            <SectionTitle title="feedback" />
            <p className="text-[#5B6469]">Let's see what people say about us</p>
          </article>
          <div className="flex gap-4 sm:flex-nowrap flex-wrap lg:w-1/2 mx-auto">
            <div className="rounded-md w-full flex flex-col gap-3 items-center">
              <NewsCard text="The personalized insights have really helped me stay calm and focused daily!" />
              <NewsCard text="Calm Connect’s mood analysis is spot-on and so easy to use!" />
              <NewsCard text="I love the instant psychiatrist connection – it’s truly a lifesaver!" />
              
            </div>
            <div className="rounded-md w-full flex flex-col gap-3 items-center">
              <NewsCard text="The playlist recommendations perfectly match my mood every time!" />
              <NewsCard text="Calm Connect has helped me manage my emotions with quick insights and personalized support!" />
             
              
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
