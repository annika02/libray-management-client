import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Set dynamic title using React Helmet */}
      <Helmet>
        <title>Home</title>
      </Helmet>
    </div>
  );
};

export default Home;
