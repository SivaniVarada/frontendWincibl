import FundCard from "./FundCard";
import {
  funds_1,
  funds_2,
  funds_3,
  funds_4,
  funds_5,
  funds_6,
  funds_7,
  funds_8,
} from "../../assets/home";

const cards = [
  {
    id: 1,
    price: "FREE",
    date: "14.05.24",
    topic: "Community Awareness Program by National Disaster Rescue Force",
    image: funds_1,
    circleText: "CAP",
  },
  {
    id: 2,
    price: "FREE",
    date: "14.05.24",
    topic:
      "School Awareness Program by National Disaster Rescue Force",
    image: funds_2,
    circleText: "SAP",
  },
  {
    id: 3,
    price: "FREE",
    date: "14.05.24",
    topic:
      "DOIMUKH-12 by National Disaster Rescue Force",
    image: funds_3,
    circleText: "DOIMUKH-12",
  },
  {
    id: 4,
    price: "FREE",
    date: "14.05.24",
    topic: "MVD-DODA by State Disaster Rescue Force",
    image: funds_4,
    circleText: "MVD-DODA",
  },
  
];

export default function FundCards() {
  return (
    <article className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-4">
      {cards.map((card) => (
        <FundCard key={card.id} card={card} />
      ))}
    </article>
  );
}
