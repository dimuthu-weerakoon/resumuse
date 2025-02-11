import { useOutlet } from "react-router-dom";

import Template1Preview from "./preview/Template1Preview";

const Template1 = () => {
  return (
    <>
      <div className="template-grid ">
        {/* rendering  InputSteops componets */}
        <div className="">{useOutlet()}</div>

        <div className="template-preview-container ">
          <div className="scaled-template ">
              {/* Scaled template display */}
            <Template1Preview />
          </div>
    

        </div>
      </div>
    </>
  );
};

export default Template1;
