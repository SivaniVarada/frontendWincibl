import { logo_2 } from "../assets/home";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#212121] py-14 text-white">
      <Container>
        <div className="grid place-items-center sm:text-left text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <img src={logo_2} alt="Grant canyon" className="w-44 h-14" />
          <div className="sm:mt-0 mt-14">
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">company</h1>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Tutorials</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">browser</h1>
            <ul>
              <li>
                <a href="#">Disaster Authorities</a>
              </li>
              <li>
                <a href="#">Simulations</a>
              </li>
              <li>
                <a href="#">Resource Library</a>
              </li>
              <li>
                <a href="#">Schemes</a>
              </li>
              <li>
                <a href="#">Fundraiser</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">connect</h1>
            <ul>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Linkedin</a>
              </li>

            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
