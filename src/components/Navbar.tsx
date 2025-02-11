import { faBarsStaggered, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { disableEditmode, enableEditmode } from "../redux/slices/editModeSlice";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false); // state for visible
  const location = useLocation()
  const splitedPath = location.pathname.split("/")
  const isTemplateRoute = splitedPath.includes("template")
  const editMode: boolean = useSelector((state: any) => state.editmode)

  const dispatch = useDispatch();

  const handleEditMode = () => {
    if (editMode) {
      dispatch(disableEditmode())
    } else {
      dispatch(enableEditmode())
    }
  }
  return (
    <>
    {/* mobile menu */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.5 }}
            className="fixed right-0 z-[200] h-screen w-80 p-3 font-serif bg-blue-900 bg-opacity-30 backdrop-blur-sm"
          >
            <div className="flex justify-between mb-3 ">
              <NavLink to={"/"}><h3 className="text-2xl font-semibold "><span className="text-blue-700/65">Resu</span><span className="text-blue-900">Muse</span></h3></NavLink>

              <button
                className="absolute top-4 right-4 text-white"
                onClick={() => setIsVisible(false)}
              >
                {/* close button for mobile menu side bar */}
                <FontAwesomeIcon icon={faClose} size="lg" />
              </button>
            </div>
            <div className="">
              <ul className="flex flex-col gap-3" >
                <li>
                  <NavLink
                    to="/templates"
                    className={({ isActive }) =>
                      isActive
                        ? " text-blue-50 px-3 py-1"
                        : "text-gray-700 hover:text-blue-900"
                    }
                  >
                    Templates
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-800 bg-blue-50 px-3 py-1 rounded"
                        : "text-gray-700 hover:text-blue-800"
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-800 bg-blue-50 px-3 py-1 rounded"
                        : "text-gray-700 hover:text-blue-800"
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Navbar */}
      <div className="sticky z-[180] backdrop-blur-lg bg-blue-900/10 top-0 flex justify-between p-3 items-center shadow font-serif">
        {/* Logo */}
        <div>
          <NavLink to={"/"}><h3 className="text-2xl font-semibold text-blue-900"><span className="text-blue-700/65">Resu</span><span className="text-blue-900">Muse</span></h3></NavLink>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:block">
          <ul className="font-medium flex gap-4">
            <li>
              <NavLink
                to="/templates"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-900 bg-blue-50 px-3 py-1 rounded"
                    : "text-blue-700/85 hover:text-blue-900"
                }
              >
                Templates
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-800 bg-blue-50 px-3 py-1 rounded"
                    : "text-blue-700/85 hover:text-blue-800"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-800 bg-blue-50 px-3 py-1 rounded"
                    : "text-blue-700/85 hover:text-blue-800"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div>
            {isTemplateRoute &&
              <Button variant="flat"
                onPress={ handleEditMode}
                color={editMode ? "warning" : "primary"}>
                {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
              </Button>
            }
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsVisible(!isVisible)}>
              <FontAwesomeIcon icon={faBarsStaggered} size="lg" className="text-blue-900" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
