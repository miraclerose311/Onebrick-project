import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addDedication } from "../../actions/brick";

import { FaAnglesRight } from "react-icons/fa6";
import userImg from "../../assets/img/user.png";
import AvatarUpload from "../FileUpload/AvatarUpload";

const DedicationFormModal = ({ handleNextModal, brick_id }) => {
  // Declear States for Dedication Form
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [filePath, setFilePath] = useState(userImg);
  const [image, setImage] = useState();
  const [errors, setErrors] = useState({
    name: "",
    relationship: "",
    message: "",
  });

  // Get Dedication data from Redux for display when redirect
  const { dedication } = useSelector((state) => state.brick.current);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(dedication.name);
    setRelationship(dedication.relationship);
    setMessage(dedication.message);
    setImage(dedication.image);
  }, [
    dedication.name,
    dedication.relationship,
    dedication.message,
    dedication.image,
  ]);

  const handleSelect = async (file) => {
    if (file) {
      setFilePath(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target.result;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    let newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!relationship.trim()) {
      newErrors.relationship = "Relationship is required";
    }
    if (!message.trim()) {
      newErrors.message = "Dedication message is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const dedicationData = {
        brick_id,
        name,
        relationship,
        message,
        image,
      };
      dispatch(addDedication(dedicationData));
      handleNextModal();
    }
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <>
      <p className="text-xl font-medium sm:text-2xl font-montserrat px-8">
        Dedicate your brick to someone you love!
      </p>
      <p className="font-raleway text-md sm:text-lg my-4">
        Provide details of the person you would like to dedicate this brick
      </p>
      {/* <p className="font-raleway text-xl my-4">
        You have taken a step towards making a significant difference!
      </p> */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={classNames(
          "border border-gray-400 rounded-lg w-4/5 sm:w-2/3 my-2 px-4 py-1.5 sm:py-2",
          errors.name && "border-red-400"
        )}
        placeholder="I dedicate this brick to(name)"
      />
      {errors.name && (
        <p className="text-red-400 text-xs text-left w-4/5 sm:w-2/3">
          {errors.name}
        </p>
      )}
      <input
        value={relationship}
        onChange={(e) => setRelationship(e.target.value)}
        className={classNames(
          "border border-gray-400 rounded-lg w-4/5 sm:w-2/3 my-2 px-4 py-1.5 sm:py-2",
          errors.relationship && "border-red-400"
        )}
        placeholder="who is my"
      />
      {errors.relationship && (
        <p className="text-red-400 text-xs text-left w-4/5 sm:w-2/3">
          {errors.relationship}
        </p>
      )}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={classNames(
          "border border-gray-400 rounded-lg w-4/5 sm:w-2/3 my-2 px-4 py-1.5 sm:py-2 h-20 sm:h-24",
          errors.message && "border-red-400"
        )}
        placeholder="Dedication Message"
      />
      {errors.message && (
        <p className="text-red-400 text-xs text-left w-4/5 sm:w-2/3">
          {errors.message}
        </p>
      )}
      <div className="border border-gray-400 w-4/5 sm:w-2/3 rounded-lg my-2 px sm:px-4 sm:py-2 flex justify-center items-center">
        <div className="object-cover flex">
          <AvatarUpload
            previewFile={filePath}
            onFileSelect={handleSelect}
            className="w-full h-full"
          />
        </div>
      </div>
      <button
        className="text-gray-100 bg-red-700 hover:bg-red-800 w-4/5 sm:w-2/3 flex justify-center py-2 my-4 rounded-md"
        onClick={handleSubmit}
      >
        <span className="flex flex-row items-center justify-between gap-x-3">
          SAVE DEDICATION
          <FaAnglesRight />
        </span>
      </button>
    </>
  );
};

DedicationFormModal.propTypes = {
  handleNextModal: PropTypes.func.isRequired,
  brick_id: PropTypes.string.isRequired,
};

export default DedicationFormModal;
