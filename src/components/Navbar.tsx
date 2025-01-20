import { faBarsStaggered, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import  { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <>
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
              <NavLink to={"/"}><h3 className="text-2xl font-semibold text-blue-900">ResuMuse</h3></NavLink>

              <button
                className="absolute top-4 right-4 text-white"
                onClick={() => setIsVisible(false)}
              >
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
      <div className="sticky z-[180] backdrop-blur-lg  top-0 flex justify-between p-3 items-center shadow font-serif">
        {/* Logo */}
        <div>
          <NavLink to={"/"}><h3 className="text-2xl font-semibold text-blue-900">ResuMuse</h3></NavLink>
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

        <div className="md:hidden">


          <button onClick={() => setIsVisible(!isVisible)}>
            <FontAwesomeIcon icon={faBarsStaggered} size="lg" className="text-blue-900"/>
          </button>

        </div>
      </div>
    </>
  );
};

export default Navbar;
