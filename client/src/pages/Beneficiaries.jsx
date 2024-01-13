import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

const Beneficiaries = () => {
  return (
    <div className="relative ">
      <Navbar />
      <div className="h-[600px] text-center flex flex-col justify-center text-xl font-bold">
        Beneficiaries Page
      </div>
      <Footer />
    </div>
  );
};

export default Beneficiaries;
