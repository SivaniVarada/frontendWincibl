// import { c1,c2,c3,c4,c5,c6,c7,c8 } from "../../assets/home";
// import Container from "../Container";
// import SectionTitle from "./SectionTitle";

// const cards = [
//   {
//     id: 1,
//     image: c1,
//     title: "Depression",
//   },
//   {
//     id: 2,
//     image: c2,
//     title: "eating Disorder",
//   },
//   {
//     id: 3,
//     image: c3,
//     title: "Split Personality",
//   },
//   {
//     id: 4,
//     image: c4,
//     title: "Anxiety",
//   },
//   {
//     id: 1,
//     image: c5,
//     title: "Emotioal Burnout",
//   },
//   {
//     id: 2,
//     image: c6,
//     title: "Identity Crisis",
//   },
//   {
//     id: 3,
//     image: c7,
//     title: "Addiction",
//   },
//   {
//     id: 4,
//     image: c8,
//     title: "OCD",
//   },
  
// ];

// const DiscoverCard = ({ card }) => {
//   return (
//     <div className="relative rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform">
//       <img src={card.image} alt="discover_image" />
//       <div className="absolute bottom-6 capitalize left-5 text-white font-bold sm:text-[40px]">
//         {card.title}
//       </div>
//     </div>
//   );
// };

// export default function Discover() {
//   return (
//     <section className="my-14">
//       <Container>
//         <div>
//           <SectionTitle title="services" />
//           <div className="grid sm:grid-cols-3 mt-4 sm:grid-cols-4 grid-cols-1 place-items-center lg:gap-10 gap-4">
//             {cards.map((card) => (
//               <DiscoverCard card={card} key={card.id} />
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }
import { c1, c2, c3, c4, c5, c6, c7, c8 } from "../../assets/home";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import { Link } from "react-router-dom"; // Import Link for navigation

const cards = [
  {
    id: 1,
    image: c1,
    title: "Depression",
    link: "/depression",
  },
  {
    id: 2,
    image: c2,
    title: "eating Disorder",
    link: "/eating-disorder",
  },
  {
    id: 3,
    image: c3,
    title: "Social Pressure",
    link: "/social-pressure",
  },
  {
    id: 4,
    image: c4,
    title: "Anxiety",
    link: "/anxiety",
  },
  {
    id: 5,
    image: c5,
    title: "Emotional Burnout",
    link: "/emotional-burnout",
  },
  {
    id: 6,
    image: c6,
    title: "Academic Pressure",
    link: "/Academic-pressure",
  },
  {
    id: 7,
    image: c7,
    title: "Addiction",
    link: "/addiction",
  },
  {
    id: 8,
    image: c8,
    title: "Sleep Deprevation",
    link: "/sleep-deprevation",
  },
];

const DiscoverCard = ({ card }) => {
  return (
    <Link to={card.link}> {/* Wrap the card content with a Link */}
      <div className="relative rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform">
        <img src={card.image} alt={card.title} />
        <div className="absolute bottom-6 capitalize left-5 text-white font-bold sm:text-[40px]">
          {card.title}
        </div>
      </div>
    </Link>
  );
};

export default function Discover() {
  return (
    <section className="my-14">
      <Container>
        <div>
          <SectionTitle title="services" />
          <div className="grid sm:grid-cols-3 mt-4 sm:grid-cols-4 grid-cols-1 place-items-center lg:gap-10 gap-4">
            {cards.map((card) => (
              <DiscoverCard card={card} key={card.id} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
