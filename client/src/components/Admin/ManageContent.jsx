import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const ManageContent = () => {
  const base_URL = "http://localhost:5000";
  const fileList = ["Home1", "Home2", "Home3", "Home4", "Home5"];

  const [imgSrc, setImageSrc] = useState({
    Home1: "",
    Home2: "",
    Home3: "",
    Home4: "",
    Home5: "",
    Home6: "",
  });

  const [formData, setFormData] = useState({
    Home1: "",
    Home2: "",
    Home3: "",
    Home4: "",
    Home5: "",
    Home6: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target.result;
        setFormData({ ...formData, [event.target.name]: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log("formdata", formData);
  }, [formData]);

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
    console.log("loadImage");
    fileList.forEach((name) => {
      // Changed from map to forEach since you don't use the returned array
      console.log(name);
      fetch(`${base_URL}/upload/${name}.txt`)
        .then((response) => response.text())
        .then((base64Text) => {
          console.log(base64Text);
          setImageSrc((prevImgSrc) => ({
            ...prevImgSrc,
            [name]: `${base64Text}`, // Assuming [name] is a unique key
          }));
        })
        .catch(console.error);
    });
  };

  useEffect(() => {
    console.log(imgSrc);
  }, [imgSrc]);

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div className="pt-12 w-full">
      <form onSubmit={handleUpload}>
        <p className="text-4xl font-montserrat font-medium text-amber-600 underline">
          Home page content management
        </p>
        <div className="w-full flex flex-wrap">
          <div className="w-1/5 p-5">
            <div className="flex flex-col gap-3">
              <div className="w-full h-full">
                {imgSrc.Home1 && (
                  <img className="rounded-md" src={imgSrc.Home1} />
                )}
              </div>
              <input type="file" name="Home1" onChange={handleFileChange} />
            </div>
          </div>
          <div className="w-1/5 p-5">
            <div className="flex flex-col gap-3">
              <div className="w-full">
                {imgSrc.Home2 && (
                  <img className="rounded-md" src={imgSrc.Home2} />
                )}
              </div>
              <input type="file" name="Home2" onChange={handleFileChange} />
            </div>
          </div>
          <div className="w-1/5 p-5">
            <div className="flex flex-col gap-3">
              <div className="w-full">
                {imgSrc.Home3 && (
                  <img className="rounded-md" src={imgSrc.Home3} />
                )}
              </div>
              <input type="file" name="Home3" onChange={handleFileChange} />
            </div>
          </div>
          <div className="w-1/5 p-5">
            <div className="flex flex-col gap-3">
              <div className="w-full">
                {imgSrc.Home4 && (
                  <img className="rounded-md" src={imgSrc.Home4} />
                )}
              </div>
              <input type="file" name="Home4" onChange={handleFileChange} />
            </div>
          </div>
          <div className="w-1/5 p-5">
            <div className="flex flex-col gap-3">
              <div className="w-full">
                {imgSrc.Home5 && (
                  <img className="rounded-md" src={imgSrc.Home5} />
                )}
              </div>
              <input type="file" name="Home5" onChange={handleFileChange} />
            </div>
          </div>
          <div className="w-1/5 p-5">
            <div className="flex flex-col gap-3">
              <div className="w-full">
                {imgSrc.Home5 && (
                  <img className="rounded-md" src={imgSrc.Home6} />
                )}
              </div>
              <input type="file" name="Home5" onChange={handleFileChange} />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 m-3 rounded-lg"
        >
          Change Contents
        </button>
      </form>
    </div>
  );
};

export default ManageContent;
