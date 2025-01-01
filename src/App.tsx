import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Template1 from "./cv_templates/Template1"
import Home from "./pages/Home"
import CreateCV from "./pages/CreateCV"
import {  faFacebook, faGithub,faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {faGlobe} from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core"

library.add(faFacebook,faGithub,faLinkedin,faGlobe)
export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Home />} />
        <Route path="/create" element={<CreateCV/>}/>
        <Route path="/template" element={<Template1 />} />
      </>


    )
  )


  return <RouterProvider router={router} />
}