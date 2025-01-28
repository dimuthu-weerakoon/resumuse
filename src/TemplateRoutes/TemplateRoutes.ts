import Template1Preview from "../cv_templates/preview/Template1Preview";
import Template2Preview from "../cv_templates/preview/Template2Preview";
import Template3Preview from "../cv_templates/preview/Template3Preview";
import Template1 from "../cv_templates/Template1";
import Template2 from "../cv_templates/Template2";
import Template3 from "../cv_templates/Template3";
import temp3img from "../assets/img/temp3.png";
import temp2img from "../assets/img/temp2.png";
import temp1img from "../assets/img/temp1.png";

export const templateRoutes = [
  {
    templateId: 1,
    imgUrl: temp1img,
    path: "template/1",
    element: Template1,
    previewElement: Template1Preview,
    category: "ATS / Modern",
  },
  {
    templateId: 2,
    imgUrl: temp2img,
    path: "template/2",
    element: Template2,
    previewElement: Template2Preview,
    category: "Traditional",
  },
  {
    templateId: 3,
    imgUrl: temp3img,
    path: "template/3",
    element: Template3,
    previewElement: Template3Preview,
    category: "ATS / Classic",
  },
];
