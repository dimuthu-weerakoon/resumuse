import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import InputPersonalInfo from "./components/input/InputPersonalInfo";
import InputContactInfo from "./components/input/InputContactInfo";
import InputSocialLink from "./components/input/InputSocialLink";
import InputEducation from "./components/input/InputEducation";
import InputExperience from "./components/input/InputExperience";
import InputSummery from "./components/input/InputSummery";
import InputCustom from "./components/input/InputCustom";
import { templateRoutes } from "./TemplateRoutes/TemplateRoutes";
import TemplateBlock from "./pages/TemplateBlock";
import InputSteps from "./components/input/InputSteps";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Home />} />
        <Route path="templates" element={<TemplateBlock />}>
          {templateRoutes.map(temp => (
            <Route key={temp.templateId} path={temp.path} element={<temp.element />}>
              <Route path="create" element={<InputSteps />}>
                <Route index element={<InputPersonalInfo templateId={temp.templateId} />} />
                <Route path="contact-info" element={<InputContactInfo templateId={temp.templateId} />} />
                <Route path="social-link" element={<InputSocialLink templateId={temp.templateId} />} />
                <Route path="education" element={<InputEducation templateId={temp.templateId} />} />
                <Route path="experience" element={<InputExperience templateId={temp.templateId} />} />
                <Route path="summery" element={<InputSummery templateId={temp.templateId} />} />
                <Route path="custom-section" element={<InputCustom templateId={temp.templateId} />} />
              </Route>
            </Route>
          ))}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
