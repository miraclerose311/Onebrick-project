import { useSelector } from "react-redux";

const ProgressBar = () => {
  const { sold } = useSelector((state) => state.admin);

  return (
    <div className="fixed sm:left-16 md:left-20 lg:left-24 xl:left-36 bottom-16 sm:w-1/10 sm:w-1/6 flex flex-col items-center z-10">
      <div className="font-montserrat text-sky-700 font-bold">
        {sold} / 35000
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2.5">
        <div
          className="bg-sky-700 h-2.5 rounded-full"
          style={{ width: `${(sold / 35000) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
