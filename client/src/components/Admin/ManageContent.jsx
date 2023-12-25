import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const ManageContent = () => {
  const base_URL = "http://localhost:5000";
  //   const base_URL = "https://outgoing-mullet-initially.ngrok-free.app";

  const [fileName, setFileName] = useState(null);
  const [base64, setBase64] = useState("");
  const [imgSrc, setImageSrc] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFileName(event.target.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target.result;
        setBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const res = await axios.post(
      `${base_URL}/api/upload/image`,
      {
        base64String: base64,
        fileName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
  };

  const loadImage = () => {
    fetch(`${base_URL}/upload/Home1.txt`)
      .then((response) => response.text())
      .then((base64Text) => {
        // Update the state with the proper image source
        // Including the data URI scheme with the MIME type (assuming image/jpeg here)
        setImageSrc(`data:image/jpeg;base64,${base64Text}`);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadImage();
  });

  return (
    <div className="p-32">
      <form onSubmit={handleUpload}>
        <input type="file" name="Hom1" onChange={handleImageUpload} />
        <button
          type="submit"
          className="bg-sky-400 text-white p-6 m-6 rounded-lg"
        >
          Upload
        </button>
      </form>
      <img src={imgSrc} />
    </div>
  );
};

export default ManageContent;
