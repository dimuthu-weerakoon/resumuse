import { Button } from "@heroui/react";
import PreviewPanel from "./Preview";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

const Finalize = ({ previewTemplate }: { previewTemplate: JSX.Element }) => {
  const [open, setOpen] = useState<boolean>(false); // states for open and close dialog paneel in preview pannel;
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center items-center h-72 w-full"
    >
      <div className="mb-4 text-center">
        <h2 className=" input-heading">Finalize Your Resume</h2>
        <p className="input-sub-heading">
          Preview and download your professionally formatted resume.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center"
      >
        <Button
          className="input-nav-btn"
          onPress={() => setOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faFile} /> Preview or Download as PDF
        </Button>

        <div className="mt-5">
          <p className="text-xs text-blue-900 font-medium">
            <FontAwesomeIcon icon={faExclamationTriangle} /> Have any
            corrections on previous steps ?{" "}
            {/* button to naviagete previous route */}
            <button onClick={() => navigate(-1)} className="text-blue-700 underline">
              Go Back
            </button>
          </p>
        </div>
      </motion.div>

      <PreviewPanel open={open} setOpen={setOpen}>
        {/* Preview pannel children current preview template */}
        {previewTemplate}
      </PreviewPanel>
    </motion.div>
  );
};

export default Finalize;
