import Template1Preview from "../cv_templates/preview/Template1Preview";
import Template2Preview from "../cv_templates/preview/Template2Preview";
import Template1 from "../cv_templates/Template1";
import Template2 from "../cv_templates/Template2";

export const templateRoutes = [
  {
    templateId: 1,
    imgUrl:
      "https://www.getyourcv.net/wp-content/uploads/2023/05/professional-cv-template-word.jpg.webp",
    path: "template/1", 
    element: Template1,
    previewElement: Template1Preview,
    category:"ATS / Modern"
  },
  {
    templateId: 2,
    imgUrl:
      "https://www.getyourcv.net/wp-content/uploads/2023/05/professional-cv-template-word.jpg.webp",
    path: "template/2", 
    element: Template2,
    previewElement: Template2Preview,
    category:"Traditional"

  },
  {
    templateId: 3,
    imgUrl:
      "https://www.getyourcv.net/wp-content/uploads/2023/05/professional-cv-template-word.jpg.webp",
    path: "template/3", 
    element: Template2,
    previewElement: Template2Preview,
    category:"ATS / Classic"

  },
];
