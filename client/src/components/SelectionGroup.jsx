import { useState } from "react";
import Collapse from "./Collapse";

const SelectionGroup = () => {
  const data = [
    {
      title: "HOW DOES PURCHASING A CRICK HELP THE HOSPICE?",
      content:
        "Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. ",
    },
    {
      title: "HOW DOES PURCHASING A CRICK HELP THE HOSPICE?",
      content:
        "Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. ",
    },
    {
      title: "HOW DOES PURCHASING A CRICK HELP THE HOSPICE?",
      content:
        "Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. ",
    },
    {
      title: "HOW DOES PURCHASING A CRICK HELP THE HOSPICE?",
      content:
        "Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. ",
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

  return (
    <div className="flex flex-col w-full gap-3 bg-gray-200">
      {data.map((item, index) => {
        return (
          <Collapse
            key={index}
            id={index}
            expand={expand.id === index ? expand.isExpand : false}
            title={item.title}
            content={item.content}
            handleClickExpand={handleClickExpand}
          />
        );
      })}
    </div>
  );
};

export default SelectionGroup;
