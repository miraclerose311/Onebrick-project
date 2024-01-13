import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getContents, updateContent } from "../../actions/content";
import EditableParagraph from "../FileUpload/EditableParagraph";
import EditableParagraphWithIcon from "../FileUpload/EditableParagraphWithIcon";

const ManageContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContents());
  }, []);

  const { contents } = useSelector((state) => state.content);

  const onBlur = (name, content) => {
    const contentData = {
      name,
      content,
    };
    dispatch(updateContent(contentData));
  };

  return (
    <div className="pt-12 w-full">
      <div className="flex flex-col bg-gray-200 gap-2 p-3">
        <EditableParagraph
          name="Question1"
          content={
            contents.Question1 ||
            "HOW DOES PURCHASING A CRICK HELP THE HOSPICE?"
          }
          className="text-lg font-medium"
          onBlur={onBlur}
        />
        <EditableParagraphWithIcon
          name="Answer1"
          content={
            contents.Answer1 ||
            "Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. Your dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution."
          }
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

export default ManageContent;
