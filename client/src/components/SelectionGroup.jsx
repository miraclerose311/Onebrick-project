import { useEffect, useState } from "react";
import Collapse from "./Collapse";
import { useDispatch, useSelector } from "react-redux";
import { getContents, updateContent } from "../actions/content";

const SelectionGroup = () => {
  const data = [
    {
      QuestionName: "Question1",
      AnswerName: "Answer1",
    },
    {
      QuestionName: "Question2",
      AnswerName: "Answer2",
    },
    {
      QuestionName: "Question3",
      AnswerName: "Answer3",
    },
    {
      QuestionName: "Question4",
      AnswerName: "Answer4",
    },
  ];

  const [expand, setExpand] = useState({
    id: 0,
    isExpand: false,
  });

  const handleClickExpand = (id, expand) => {
    setExpand({
      id: id,
      isExpand: !expand,
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContents());
  }, []);

  const { contents } = useSelector((state) => state.content);

  const handleBular = (name, content) => {
    const contentData = {
      name,
      content,
    };
    dispatch(updateContent(contentData));
  };

  return (
    <div className="flex flex-col w-full gap-3 bg-gray-200">
      {data.map((item, index) => {
        return (
          <Collapse
            key={index}
            id={index}
            expand={expand.id === index ? expand.isExpand : false}
            QuestionName={item.QuestionName}
            AnswerName={item.AnswerName}
            question={
              contents[item.QuestionName]
                ? contents[item.QuestionName]
                : "HOW DOES PURCHASING A CRICK HELP THE HOSPICE?"
            }
            answer={
              contents[item.AnswerName]
                ? contents[item.AnswerName]
                : "Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. Your dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution."
            }
            handleBular={handleBular}
            handleClickExpand={handleClickExpand}
          />
        );
      })}
    </div>
  );
};

export default SelectionGroup;
