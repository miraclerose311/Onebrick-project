import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";



const Donors = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-[80vh] flex items-center justify-center pt-28 pb-12 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64">
        <p className="text-3xl">Donors</p>
      </div>
      <Footer />
    </>
  );
};

export default Donors;
