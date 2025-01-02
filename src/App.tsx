import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import Home from "./pages/Home"
import {  faFacebook, faGithub,faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {faGlobe} from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core"
import CreateCV from "./pages/CreateCV"

library.add(faFacebook,faGithub,faLinkedin,faGlobe)
export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Home />} />
        <Route path="/create" element={<CreateCV/>}/>
       
      </>


    )
  )


  return <RouterProvider router={router} />
}