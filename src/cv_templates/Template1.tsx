import { useOutlet } from "react-router-dom";

import Template1Preview from "./preview/Template1Preview";

const Template1 = () => {
  return (
    <>
      <div className="template-grid ">
        <div>{useOutlet()}</div>

        <div className="template-preview-container ">
        
          <div className="scaled-template ">
            <Template1Preview />
          </div>
    

        </div>
      </div>
    </>
  );
};

export default Template1;
