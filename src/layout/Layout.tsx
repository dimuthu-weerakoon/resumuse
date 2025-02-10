import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const Layout = () => {
  return (
    //main layout 
    <div className=" overflow-hidden">
      {/* Navbar componets */}
      <Navbar />
      {/* rendering child elements / pages */}
      <Outlet />
      {/* Footer element */}
      <Footer />
    </div>

  )
}

export default Layout