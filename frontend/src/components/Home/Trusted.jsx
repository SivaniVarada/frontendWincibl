import { t1, t2, t3 } from "../../assets/home/trusted";
import SectionTitle from "./SectionTitle";

export default function Trusted() {
  return (
    <section className="mt-14 bg-[#6D9886] rounded-md py-24">
      <div className="flex items-center md:justify-around px-4 gap-4 flex-wrap justify-center">
        <SectionTitle title="our stake holders" classes="opacity-50" />
        <div className="lg:w-1/2 w-full flex flex-wrap items-center lg:justify-start justify-center gap-4 lg:mt-0 mt-4">
          <img src={t1} alt="broken" className="w-45 h-15 mb-4" />
          <img src={t2} alt="broken" className="w-45 h-15 mb-4" />
          <img src={t3} alt="broken" className="w-45 h-15 mb-4" />

        </div>
      </div>
    </section>
  );
}
