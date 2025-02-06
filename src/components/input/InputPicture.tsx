import {
  faArrowLeft,
  faArrowRight,
  faCancel,
  faClose,
  faUpload,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPicture, setPicture } from "../../redux/slices/PictureSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const InputPicture = ({ templateId }: { templateId: number }) => {
  const { pictureFile }: { pictureFile: File | null } = useSelector(
    (state: any) => state.picture
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const pictureUrl = pictureFile ? URL.createObjectURL(pictureFile) : null;

  const handleNext = () => {
    navigate(`/template/${templateId}/create/finalize`);
  };
  const handleBack = () => {
    navigate(`/template/${templateId}/create/refrees`);
  };
  const handleFileClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleFileDragLeave = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      dispatch(setPicture(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      dispatch(setPicture(e.target.files[0]));
    }
  };

  const handleFileRemove = () => {
    if (pictureFile) {
      dispatch(clearPicture());
    }
  };

  useEffect(() => {
    return () => {
      if (pictureUrl) {
        URL.revokeObjectURL(pictureUrl);
      }
    };
  }, [pictureFile]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div className="flex justify-between mb-4">
        <Button
          size="sm"
          onPress={handleBack}
          variant="flat"
          className="input-nav-btn"
        >
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} />{" "}
        </Button>
        <Button
          size="sm"
          onPress={handleNext}
          variant="flat"
          className="input-nav-btn"
        >
          {" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
        </Button>
      </div>
      <div className="mb-4">
        <h2 className=" input-heading">Photo</h2>
        <p className="input-sub-heading">
          Upload a professional photo to personalize your resume and create a
          strong first impression.
        </p>
      </div>
      <div
        onDrop={handleFileDrop}
        onDragOver={handleFileDragOver}
        onDragLeave={handleFileDragLeave}
        className={`${
          dragging && "bg-blue-200"
        } flex flex-col gap-4 justify-center items-center w-full border-blue-200 border-dashed border-2 rounded-lg p-3`}
      >
        <div>
          <input
            multiple={false}
            type="file"
            onChange={handleFileChange}
            name="img"
            ref={fileInput}
            className="hidden"
          />
        </div>

        {pictureUrl ? (
          <img
            className="object-cover object-top rounded-full w-40 h-40"
            src={pictureUrl}
            alt={"profile"}
          />
        ) : (
          <FontAwesomeIcon
            icon={faUserCircle}
            size="10x"
            className={`text-${dragging ? "blue-500" : "blue-100"}`}
          />
        )}

        <div className="flex justify-between flex-nowrap gap-3">
          <Button
            size="sm"
            onPress={handleFileClick}
            className="shadow-blue-700 shadow-xl input-action-btn"
          >
            <FontAwesomeIcon icon={faUpload} /> Upload
          </Button>
          <Button
            size="sm"
            onPress={handleFileRemove}
            className="text-red-700 font-medium  "
          >
            <FontAwesomeIcon icon={faClose} /> Remove
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default InputPicture;
