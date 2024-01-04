import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../ImageUpload";
import EditableParagraph from "../EditableParagraph";

const ManageContent = () => {
  const base_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  const [imgSrc, setImageSrc] = useState({
    Home1: "",
    Home2: "",
    Home3: "",
    Home4: "",
    Home5: "",
    Home6: "",
  });

  const fileList = Object.keys(imgSrc);

  // const [formData, setFormData] = useState({
  //   Home1: "",
  //   Home2: "",
  //   Home3: "",
  //   Home4: "",
  //   Home5: "",
  //   Home6: "",
  // });

  const [imageData, setImageData] = useState({});

  const handleFileChange = async (file, fileName) => {
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
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  useEffect(() => {
    sendFileData();
  }, [imageData]);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       const base64String = e.target.result;
  //       setFormData({ ...formData, [event.target.name]: base64String });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // useEffect(() => {
  //   console.log("formdata", formData);
  // }, [formData]);

  const handleUpload = async () => {
    const res = await axios.post(
      `${base_URL}/api/upload/image`,
      { formData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const loadImage = () => {
    fileList.forEach((name) => {
      // Changed from map to forEach since you don't use the returned array
      fetch(`${base_URL}/upload/${name}.txt`)
        .then((response) => response.text())
        .then((base64Text) => {
          setImageSrc((prevImgSrc) => ({
            ...prevImgSrc,
            [name]: `${base64Text}`, // Assuming [name] is a unique key
          }));
        })
        .catch(console.error);
    });
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div className="pt-12 w-full">
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 h-32 p-2">
        <div className="h-full flex flex-col gap-3">
          <ImageUpload
            fileName="Home6"
            previewFile={imgSrc.Home6}
            onFileSelect={handleFileChange}
          />
        </div>
      </div>
      <EditableParagraph />
    </div>
  );
};

export default ManageContent;
