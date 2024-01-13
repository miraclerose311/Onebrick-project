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
  const classOfQuestion = expand
    ? "text-red-800 text-xl underline decoration-red-800"
    : "text-xl";
  const classOfButton = expand
    ? "text-red-800 text-3xl"
    : "text-2xl text-center";

  return (
    <div id={id} className="bg-white w-full px-3 py-2 flex-col rounded-lg">
      <div className="flex justify-between items-center">
        <EditableParagraph
          name={QuestionName}
          content={question}
          onBlur={handleBular}
          className={classOfQuestion}
        />
        <button
          className={classOfButton}
          onClick={() => handleClickExpand(id, expand)}
        >
          {expand ? "-" : "+"}
        </button>
      </div>
      {expand && (
        <EditableParagraph
          name={AnswerName}
          content={answer}
          onBlur={handleBular}
        />
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
