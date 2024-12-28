import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Template1 from "./cv_templates/Template1"
import Home from "./pages/Home"
import CreateCV from "./pages/CreateCV"

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