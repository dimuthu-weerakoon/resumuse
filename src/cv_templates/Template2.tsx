import { useOutlet } from "react-router-dom";

import Template2Preview from "./preview/Template2Preview";

const Template1 = () => {
  return (
    <>
      <div className="template-grid">
        {/* rendering  InputSteops componets */}
        <div>{useOutlet()}</div>

        <div className="template-preview-container  ">
          <div className="scaled-template ">
            {/* Scaled template display */}
            <Template2Preview />
          </div>
        </div>
      </div>
    </>
  );
};

export default Template1;
