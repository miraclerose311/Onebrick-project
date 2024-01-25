import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";

import { getCurrentDonors } from "../actions/donor";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Donors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentDonors());
  }, []);

  const { currentDonors } = useSelector((state) => state.donor);

  console.log(currentDonors);

  return (
    <>
      <Navbar />
      <div className="w-full h-[80vh] pt-28 pb-12 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64">
        <div className="flex flex-wrap py-12">
          {/* {currentDonors &&
            currentDonors.map((donor, index) => {
              return (
                <div
                  key={index}
                  className="w-32 p-3 flex flex-col items-center gap-5 border border-gray-600 rounded-lg cursor-pointer"
                >
                  <img src={donor.avatar} className="w-24 h-24 rounded-full" />
                  <p className="text-xl text-center font-medium font-montserrat">
                    {donor.fullName}
                  </p>
                </div>
              );
            })} */}
          <div className="scene scene--card">
            <div className="card">
              <div className="card__face card__face--front">Front</div>
              <div className="card__face card__face--back">Back</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donors;
