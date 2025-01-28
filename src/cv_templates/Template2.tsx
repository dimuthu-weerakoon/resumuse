import { useOutlet } from "react-router-dom";

import Template2Preview from "./preview/Template2Preview";

const Template1 = () => {
  return (
    <>
      <div className="template-grid">
        <div>{useOutlet()}</div>

        <div className="template-preview-container  ">
          <div className="scaled-template ">
            <Template2Preview />
          </div>
        </div>
      </div>
    </>
  );
};

export default Template1;
