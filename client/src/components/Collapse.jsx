import PropTypes from "prop-types";
import EditableParagraph from "./FileUpload/EditableParagraph";

const Collapse = ({
  id,
  QuestionName,
  AnswerName,
  expand,
  question,
  answer,
  handleBular,
  handleClickExpand,
}) => {

  const classsOfQuestion = expand ? "text-red-700" : "";

  return (
    <div id={id} className="bg-white w-full px-6 py-4 flex-col rounded-lg">
      <div
        className={`flex justify-between items-center text-sm md:text-lg lg:text-xl ${classsOfQuestion}`}
      >
        <EditableParagraph
          name={QuestionName}
          content={question}
          onBlur={handleBular}
          className=""
        />
        <button
          className={`flex justify-center items-center bg-gray-300  p-2 mb-2 rounded-full w-8 h-8`}
          onClick={() => handleClickExpand(id, expand)}
        >
          <span className="mb-1">{expand ? "-" : "+"}</span>
        </button>
      </div>
      {expand && (
        <div className="py-2 px-6">
          <EditableParagraph
            name={AnswerName}
            content={answer}
            onBlur={handleBular}
            className=""
          />
        </div>
      )}
    </div>
  );
};

Collapse.propTypes = {
  id: PropTypes.number.isRequired,
  expand: PropTypes.bool.isRequired,
  QuestionName: PropTypes.string.isRequired,
  AnswerName: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  handleBular: PropTypes.func.isRequired,
  handleClickExpand: PropTypes.func.isRequired,
};

export default Collapse;
