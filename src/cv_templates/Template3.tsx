import { useOutlet } from "react-router-dom";

import Template3Preview from "./preview/Template3Preview";

const Template1 = () => {
  return (
    <>
      <div className="template-grid">
         {/* Rendering InputSteps Components */}
        <div>{useOutlet()}</div>

        <div className="template-preview-container  ">
          <div className="scaled-template ">
             {/* Scaled template display */}
            <Template3Preview />
          </div>
        </div>
      </div>
    </>
  );
}; 

export default Template1;
