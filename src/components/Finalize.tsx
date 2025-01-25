import { Button } from "@nextui-org/react";
import PreviewPanel from "./Preview";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

const Finalize = ({ previewTemplate }: { previewTemplate: JSX.Element }) => {
  const [open, setOpen] = useState<boolean>(false);

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
            <Link to={-1} className="text-blue-700 underline">
              Go Back
            </Link>
          </p>
        </div>
      </motion.div>

      <PreviewPanel open={open} setOpen={setOpen}>
        {previewTemplate}
      </PreviewPanel>
    </motion.div>
  );
};

export default Finalize;
