import MyRoutes from "./MyRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Popup from './components/Popup';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MyRoutes />
      <Footer />
    </div>
  );
}

export default App;
