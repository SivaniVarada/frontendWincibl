import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import { how_1, how_2, how_3, how_4 } from "../../assets/home";

const items = [
  {
    id: 1,
    icon: how_1,
    heading: "NAMI",
    text: "Call at 800-950-6264",
  },
  {
    id: 2,
    icon: how_2,
    heading: "TELE MANAS",
    text: "Call at 14416  or 1-800-891-4416",
  },
  {
    id: 3,
    icon: how_3,
    heading: "CROSS TEXT LINE",
    text: "Text Home to 741741",
  },
  {
    id: 4,
    icon: how_4,
    heading: "SUICIDE CRISIS LIFELINE",
    text: "Call or Text 988",
  },
];

export default function HowItWorks() {
  return (
    <section className="my-36">
      <Container>
        <SectionTitle title="important details" />
        <div className="bg-[#D9CAB3] bg-opacity-30 px-8 py-14 rounded-md mt-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-8">
            {items.map((item) => (
              <div
                className="text-center flex flex-col items-center justify-center"
                key={item.id}
              >
                <img src={item.icon} alt="icon" className="pb-4 w-24" />
                <h1 className="font-bold text-lg py-4">{item.heading}</h1>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
