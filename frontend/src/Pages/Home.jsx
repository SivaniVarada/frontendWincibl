import Alert from "../components/Alert";
import Discover from "../components/Home/Discover";
import Front from "../components/Home/Front";
import Funds from "../components/Home/Funds";
import HowItWorks from "../components/Home/HowItWorks";
import News from "../components/Home/News";
import Quiz from "../components/Home/Quiz";
import Stats from "../components/Home/Stats";
import Stories from "../components/Home/Stories";
import Trusted from "../components/Home/Trusted";


export default function Home() {
  return (
    <main>
      <Alert/>
      <Front />
      <Stats />
      <Quiz />
      <Discover />
      <HowItWorks />
      <Funds />
      <Trusted />
      <News />
      <Stories />
    </main>
  );
}
