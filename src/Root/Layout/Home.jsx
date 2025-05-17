import { Helmet } from "react-helmet";
import BookCategories from "../../Components/BookCategories/BookCategories";

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Set dynamic title using React Helmet */}
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Books Category */}
      <section className="w-full px-6">
        {/* <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Book Categories</h2> */}
        <BookCategories />
      </section>
    </div>
  );
};

export default Home;
