import RandomPost from "../components/RandomPost"
import RecentPost from "../components/RecentPost";
import PopularPost from "../components/PopularPost";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <main className="">
      <PopularPost />
        <RecentPost />
        <RandomPost />
        <Newsletter />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
