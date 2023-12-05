import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sold from '../components/modals/Sold';

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className='h-[600px] text-center flex flex-col justify-center text-xl font-bold'>
        Landing Page
      </div>
      <Footer />
    </>
  );
};

export default Landing;
