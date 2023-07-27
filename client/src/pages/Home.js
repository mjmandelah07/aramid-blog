import OlderPost from "../components/OlderPost"
import RecentPost from "../components/RecentPost";
import Popular from "../components/popular";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <main className="">
        <OlderPost />
        <RecentPost />
        <Popular />
        <Newsletter />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
