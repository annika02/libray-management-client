import { Outlet } from "react-router-dom";
import Navbar from "../Components/Header/NavBar";
import Footer from "../Components/Footer/Footer";

const Root = () => {
  return (
    <>
      <header className="w-full h-12">
        <Navbar></Navbar>
      </header>

      <main>
        <Outlet></Outlet>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default Root;
