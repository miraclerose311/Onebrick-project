import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import ImageUpload from "../ImageUpload";
import EditableParagraph from "../EditableParagraph";
import { updateContent } from "../../actions/content";

const ManageContent = () => {
  const base_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  const dispatch = useDispatch();

  const [imgSrc, setImageSrc] = useState({
    Home1: "",
    Home2: "",
    Home3: "",
    Home4: "",
    Home5: "",
    Home6: "",
    BackgroundOfWallofHope: "",
  });

  const fileList = Object.keys(imgSrc);

  const [imageData, setImageData] = useState({});

  const handleFileChange = async (file, fileName) => {
    console.log("handleFileChange", fileName);
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target.result;
        setImageData({ [fileName]: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const sendFileData = async () => {
    try {
      if (imageData) {
        await axios.post(
          `${base_URL}/api/upload/image`,
          { imageData },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        loadImage();
      }
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  useEffect(() => {
    sendFileData();
  }, [imageData]);

  const loadImage = () => {
    fetch(`${base_URL}/upload/${name}.txt`)
      .then((response) => response.text())
      .then((base64Text) => {
        setImageSrc((prevImgSrc) => ({
          ...prevImgSrc,
          [name]: `${base64Text}`, // Assuming [name] is a unique key
        }));
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadImage();
  }, []);

  const onBlur = (target) => {
    const contentData = {
      name: target.name,
      content: target.textContent,
    };
    dispatch(updateContent(contentData));
  };

  return (
    <div className="pt-12 w-full">
      <p className="pt-6">Background of Wall of Hope</p>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 h-32 p-2">
        <div className="h-full flex flex-col gap-3">
          <ImageUpload
            fileName={fileList[6]}
            previewFile={imgSrc[fileList[6]]}
            onFileSelect={handleFileChange}
          />
        </div>
      </div>
      <EditableParagraph content="Editable Paragraph" onBlur={onBlur} />
    </div>
  );
};

export default ManageContent;
