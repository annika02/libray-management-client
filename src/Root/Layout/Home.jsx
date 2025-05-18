import { Helmet } from "react-helmet";
import BookCategories from "../../Components/BookCategories/BookCategories";
import LibraryBanner from "../../Components/Banner/LibraryBanner";
import RecentActivity from "../../Components/Feature/RecentActivity";
import ReadingSpotlight from "../../Components/Feature/ReadingSpotlight";
const Home = () => {
  return (
    <div className="space-y-12">
      <Helmet>
        <title>Home</title>
      </Helmet>

      <LibraryBanner />

      <section className="w-full px-6">
        <BookCategories />
      </section>

      <RecentActivity />

      <ReadingSpotlight></ReadingSpotlight>
    </div>
  );
};

export default Home;
