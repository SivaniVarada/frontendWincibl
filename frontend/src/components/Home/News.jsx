import React from "react";
import { news_2, news_3, news_4, news_5 } from "../../assets/home";
import Container from "../Container";
import SectionTitle from "./SectionTitle";

const cards = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et venenatis pharetra enim est lectus. ",
    topic:
      "Development of research in the field of air pollution Development of research in the field of air pollution",
    image: news_2,
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et venenatis pharetra enim est lectus. ",
    topic: "Development of research in the field of air pollution ",
    image: news_3,
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et venenatis pharetra enim est lectus. ",
    topic:
      "Development of research in the field of air pollution Development of research",
    image: news_4,
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et venenatis pharetra enim est lectus. ",
    topic: "Program life us expanding its offers for call for proposals",
    image: news_5,
  },

];

export default function News() {
  return (
    <section className="my-16">
      <Container>
        <div>
          <SectionTitle title="latest news" classes="text-center" />
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start gap-4 mt-8">
            {cards.map((card) => (
              <div
                className="h-auto w-[320px] mx-auto px-2 pt-2 pb-4 rounded-md border-2 border-gray-200 relative z-10"
                key={card.id}
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img src={card.image} alt="fund1" />
                </div>
                <article className="px-2">
                  <h2 className="font-bold text-[25px] hover:text-[#6D9886] transition-colors cursor-pointer my-4">
                    {card.topic}
                  </h2>
                  <p className="font-light text-[14px]">{card.text}</p>
                  <button className="block mx-auto text-[#6D9886] mt-6">
                    Read more
                  </button>
                </article>
              </div>
            ))}
          </div>
          
        </div>
      </Container>
    </section>
  );
}
