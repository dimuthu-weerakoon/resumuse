import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import CreateCV from "./pages/CreateCV";
import InputPersonalInfo from "./components/input/InputPersonalInfo";
import InputContactInfo from "./components/input/InputContactInfo";
import InputSocialLink from "./components/input/InputSocialLink";
import InputEducation from "./components/input/InputEducation";
import InputExperience from "./components/input/InputExperience";
import InputSummery from "./components/input/InputSummery";
import Template2 from "./cv_templates/Template2";

library.add(faFacebook, faGithub, faLinkedin, faGlobe);

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Home />} />
        <Route path="temp" element={<Template2/>}/>
        <Route path="create" element={<CreateCV />}>
          <Route index element={<InputPersonalInfo />} />
          <Route path="contact-info" element={<InputContactInfo />} />
          <Route path="social-link" element={<InputSocialLink />} />
          <Route path="education" element={<InputEducation />} />
          <Route path="experience" element={<InputExperience />} />
          <Route path="summery" element={<InputSummery />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
