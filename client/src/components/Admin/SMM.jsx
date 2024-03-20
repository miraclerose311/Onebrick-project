/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";

const SMM = () => {
  const [socialData, setSocialData] = useState({});

  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState("Facebook");
  const [description, setdescription] = useState("");
  const [url, setUrl] = useState("");
  const [base64String, setBase64String] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [errors, setErrors] = useState({
    description: "",
    url: "",
    base64String: "",
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const mediaTypeList = [
    "Facebook",
    "Whatsapp",
    "Linkedin",
    "Twitter",
    "Email",
    "Telegram",
  ];

  // Social Media Icons map
  // const socialMediaIcons = {
  //     Facebook: <FaFacebookSquare className="text-4xl" />,
  //     Whatsapp: <FaWhatsapp className="text-4xl" />,
  //     Linkedin: <FaLinkedin className="text-4xl" />,
  //     Twitter: <FaTwitterSquare className="text-4xl" />,
  //     Email: <FaVoicemail className="text-4xl" /> // Assuming there is no icon for Email in the react-icons library.
  // };

  useEffect(() => {
    getSocialMediaData();
  }, []);

  useEffect(() => {
    if (socialData[mediaType]) {
      const { description, url, image } = socialData[mediaType];
      setdescription(description || "");
      setUrl(url || "");
      setBase64String(image || null);
      setImagePreviewUrl(image || null);
    } else {
      // Reset fields if there's no data for this mediaType
      setdescription("");
      setUrl("");
      setBase64String(null);
      setImagePreviewUrl(null);
      setFile(null);
    }
  }, [mediaType, socialData]);

  const getSocialMediaData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/social/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dataArray = await response.json();
        console.log(Array.isArray(dataArray), dataArray);
        const dataObject = dataArray.reduce((obj, item) => {
          obj[item.mediaType] = item; // Assume each item has 'mediaType' field
          return obj;
        }, {});
        setSocialData(dataObject);
      } else {
        console.error("Error fetching social media data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching social media data:", error);
    }
  };

  const handleFileSelect = (e) => {
    const newFile = e.target.files[0];
    if (e.target) {
      setFile(newFile);
      const reader = new FileReader();
      reader.onload = async (e) => {
        setBase64String(e.target.result);
      };
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result || "");
      };
      reader.readAsDataURL(newFile);
    }
  };

  useEffect(() => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: description ? "" : prevErrors.description,
      url: url ? "" : prevErrors.url,
      base64String: base64String ? "" : prevErrors.base64String,
    }));
  }, [description, url, base64String]);

  const handleSave = async () => {
    let newErrors = {};

    if (!base64String || !base64String.trim()) {
      newErrors.base64String = "Please select image file";
    }
    if (!url || !url.trim()) {
      newErrors.url = "Please input url";
    }
    if (!description || !description.trim()) {
      newErrors.description = "Please input description text field";
    }

    setErrors(newErrors);

    // If there are no errors, proceed to dispatch the data and handle the next modal
    if (Object.keys(newErrors).length === 0) {
      const requestData = {
        mediaType,
        url,
        description,
        base64String,
      };
      const response = await fetch(`${backendUrl}/api/social/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        alert("Successfuly saved!");
        // Change socialData state after save
        setSocialData((prevData) => ({
          ...prevData,
          [mediaType]: { mediaType, url, description, image: base64String }, // Update the media type with new data
        }));
      }
    }
  };

  return (
    <div className="w-full mt-12 lg:px-12">
      <h1 className="font-raleway font-medium text-3xl lg:text-5xl py-4 text-center my-12">
        Social Media Marketing Manager
      </h1>
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <label
            htmlFor="media-type"
            className="flex flex-1 text-sm md:text-lg lg:text-xl font-sans"
          >
            Media Type
          </label>
          <select
            name="media-type"
            id="media-type"
            onChange={(e) => setMediaType(e.target.value)}
            className="w-4/5 p-2 lg:p-4 focus:outline-none border focus:border-sky-600 rounded-md text-md lg:text-lg"
          >
            {mediaTypeList.map((item, index) => {
              return (
                <option key={index} value={item} className="text-md lg:text-lg">
                  {" "}
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div className="w-full flex items-center justify-center gap-2 icon">
                    {socialMediaIcons[mediaType]}
                    <span className="text-lg lg:text-2xl">{mediaType}</span> 
                </div> */}
        <div className="flex items-center">
          <label
            htmlFor="textdescription"
            className="flex flex-1 text-sm md:text-lg lg:text-xl font-sans"
          >
            Text description
          </label>
          <div className="w-4/5 flex flex-col">
            <textarea
              name="textdescription"
              id="textdescription"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="h-16 lg:h-24 min-h-12 max-h-32 p-2 lg:p-4 focus:outline-none border focus:border-sky-600 rounded-md text-md lg:text-lg"
            />
            {errors.description && (
              <p className="text-red-400 text-xs text-left">
                {errors.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <label
            htmlFor="image"
            className="flex flex-1 text-sm md:text-lg lg:text-xl font-sans"
          >
            Image
          </label>
          <div className="w-4/5 flex flex-col">
            <div className="flex justify-start items-center gap-4">
              <label htmlFor="imgUpload" className="w-1/2 sm:w-1/3">
                <span className="bg-gray-700 hover:bg-white border-2 hover:border-gray-700 hover:text-black flex justify-center text-center  text-white px-2 lg:px-8 py-2 rounded-md text-sm md:text-md xl:text-lg cursor-pointer select-none">
                  UPLOAD IMAGE
                </span>
                <input
                  type="file"
                  id="imgUpload"
                  name="imgUpload"
                  className="hidden focus:outline-none border focus:border-sky-600 rounded-md text-md lg:text-lg"
                  onChange={handleFileSelect}
                />
              </label>
              <img
                src={imagePreviewUrl}
                alt="Uploaded file"
                className="w-48 hidden sm:flex object-cover rounded-md"
              />
              {file && <span className="truncate">{file.name}</span>}
            </div>
            {errors.base64String && (
              <p className="text-red-400 text-xs text-left">
                {errors.base64String}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <label
            htmlFor="link"
            className="flex flex-1 text-sm md:text-lg lg:text-xl font-sans"
          >
            Link
          </label>
          <div className="w-4/5 flex flex-col">
            <input
              type="email"
              name="link"
              id="link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="p-2 lg:p-4 f
                        ocus:outline-none border focus:border-sky-600 rounded-md text-md lg:text-lg"
            />
            {errors.link && (
              <p className="text-red-400 text-xs text-left">{errors.url}</p>
            )}
          </div>
        </div>
        <button
          onClick={handleSave}
          className="w-4/5 ml-auto bg-gray-700 text-white text-xl py-4 mt-4 rounded-md hover:bg-white border-2 hover:border-gray-700 hover:text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SMM;
