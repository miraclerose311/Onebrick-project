import PropTypes from "prop-types";

const SupportWord = ({ item }) => {
  const getTimeDelta = (pastDate) => {
    const now = new Date();
    const past = new Date(pastDate);
    const deltaMilliseconds = now - past;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day; // Approximate number of days in a month
    const year = 12 * month;

    if (deltaMilliseconds < minute) {
      return "Just now";
    } else if (deltaMilliseconds < hour) {
      return `${Math.floor(deltaMilliseconds / minute)} Mins`;
    } else if (deltaMilliseconds < day) {
      return `${Math.floor(deltaMilliseconds / hour)} Hours`;
    } else if (deltaMilliseconds < month) {
      return `${Math.floor(deltaMilliseconds / day)} Days`;
    } else if (deltaMilliseconds < year) {
      return `${Math.floor(deltaMilliseconds / month)} Months`;
    } else {
      return `${Math.floor(deltaMilliseconds / year)} Years`;
    }
  };

  return (
    <div className="flex flex-col py-2">
      <div className="flex items-start gap-6">
        {item.user.picture && (
          <img
            src={item.user.picture}
            alt="user avatar"
            className="w-12 h-12 rounded-full mt-1"
          />
        )}
        <div className="flex flex-col items-start">
          <p className="text-lg lg:text-xl font-medium font-raleway">
            {item.user.fullName}
          </p>
          <p className="text-gray-600 font-bold font-montserrat">
            {getTimeDelta(item.date)}
          </p>
          <p className="text-lg lg:text-xl font-normal font-raleway text-left">
            {item.message}
          </p>
        </div>
      </div>
    </div>
  );
};

SupportWord.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.shape({
      picture: PropTypes.string,
      fullName: PropTypes.string,
    }),
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    message: PropTypes.string,
  }).isRequired,
};

export default SupportWord;
