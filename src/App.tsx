import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import Home from "./pages/Home";
import InputPersonalInfo from "./components/input/InputPersonalInfo";
import InputContactInfo from "./components/input/InputContactInfo";
import InputSocialLink from "./components/input/InputSocialLink";
import InputEducation from "./components/input/InputEducation";
import InputExperience from "./components/input/InputExperience";
import InputSummery from "./components/input/InputSummery";
import { templateRoutes } from "./TemplateRoutes/TemplateRoutes";
import TemplateBlock from "./pages/TemplateBlock";
import InputSteps from "./components/input/InputSteps";
import InputRefrees from "./components/input/InputRefrees";
import Layout from "./layout/Layout";
import Templates from "./pages/Templates";
import InputPicture from "./components/input/InputPicture";
import NotFound from "./pages/NotFound";
import Finalize from "./components/Finalize";
import RouteInvalid from "./TemplateRoutes/RouteInvalid";
import Template3Preview from "./cv_templates/preview/Template3Preview";
import InputHighlight from "./components/input/InputHighlight";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="template" element={<TemplateBlock />}>
            {templateRoutes.map(temp => (
              <Route key={temp.templateId} path={`${temp.templateId}`} element={<temp.element />}>
                <Route path="create" element={<InputSteps />}>
                  <Route index element={<InputPersonalInfo templateId={temp.templateId} />} />
                  <Route path="contact-info" element={<InputContactInfo templateId={temp.templateId} />} />
                  <Route path="social-link" element={<InputSocialLink templateId={temp.templateId} />} />
                  <Route path="education" element={<InputEducation templateId={temp.templateId} />} />
                  <Route path="experience" element={<InputExperience templateId={temp.templateId} />} />
                  <Route path="summery" element={<InputSummery templateId={temp.templateId} />} />
                  <Route path="custom-section" element={<InputHighlight templateId={temp.templateId} />} />
                  <Route element={<RouteInvalid templateId={temp.templateId} />}>
                    <Route path="refrees" element={<InputRefrees templateId={temp.templateId} />} />
                    <Route path="picture" element={<InputPicture templateId={temp.templateId} />} />
                  </Route>
                  <Route path="finalize" element={<Finalize previewTemplate={<temp.previewElement />} />} />
                </Route>
              </Route>
            ))}
          </Route>
          <Route path="/templates" element={<Templates />} />
          <Route path="*" element={<NotFound />} />
          <Route path={"temp3"} element={<Template3Preview />} />
        </Route>


      </>
    )
  );

  return <RouterProvider router={router} />;
}
