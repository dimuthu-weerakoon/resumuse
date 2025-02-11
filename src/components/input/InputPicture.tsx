import {
  faArrowLeft,
  faArrowRight,
  faClose,
  faUpload,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPicture, setPicture } from "../../redux/slices/PictureSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const InputPicture = ({ templateId }: { templateId: number }) => {
  const { pictureFile }: { pictureFile: File | null } = useSelector(
    (state: any) => state.picture //picture file state from state redux store
  );

  const navigate = useNavigate(); // usenavigate hook from react router dom

  const dispatch = useDispatch(); //useDispatch hook from redux store

  const fileInput = useRef<HTMLInputElement | null>(null); // mutable ref objectb of input file element
  const [dragging, setDragging] = useState<boolean>(false); // local state for manage drag event
  const pictureUrl = pictureFile ? URL.createObjectURL(pictureFile) : null; // create object url from file

  //navigate route to next input componenet
  const handleNext = () => {
    navigate(`/template/${templateId}/create/finalize`);
  };
  //navigate route to previous input componenet

  const handleBack = () => {
    navigate(`/template/${templateId}/create/refrees`);
  };

  //function to input file click
  const handleFileClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  // function to handle event file dragging
  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  //function to handle event drag leave
  const handleFileDragLeave = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  //function to handle drop
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    //check if has event datatransfer files and its not empty
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      //   get first element from datatrasfer files array
      const file = e.dataTransfer.files[0];
      // dispatch action to set picture file to selected file
      dispatch(setPicture(file));
    }
  };

  // function to handle file after upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //if has file list and its nort empty
    if (e.target.files && e.target.files.length > 0) {
      // dispatch action to set picture file to uploaded file
      dispatch(setPicture(e.target.files[0]));
    }
  };
  // funtion to remove file
  const handleFileRemove = () => {
    // if exists picture file
    if (pictureFile) {
      // duspatchb action to clear picture file
      dispatch(clearPicture());
    }
  };

  //use effect to  release existing object url to  avoid memeory leak
  useEffect(() => {
    //return clean up function to clear object urls from browser memeory
    return () => {
      if (pictureUrl) {
        URL.revokeObjectURL(pictureUrl);
      }
    };
  }, [pictureFile]); // if file chnaged exitsting objects urls will be removed from memeory

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
        onDrop={handleFileDrop} //on drop event trigger handleFileDrop function
        onDragOver={handleFileDragOver} //on dragover event trigger handleFileDragover function
        onDragLeave={handleFileDragLeave} //on drag leave event trigger handleFileDragleave function
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
            ref={fileInput} // ref of element
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
