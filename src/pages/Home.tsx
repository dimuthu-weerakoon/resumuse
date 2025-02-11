import { useEffect, useState } from "react";
import { templateRoutes } from "../TemplateRoutes/TemplateRoutes";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
const Home = () => {
  const [indexes, setIndexes] = useState([0, 1, 2])
  const positions = ['center', 'right', 'left'];
  const titleText = ["Create",
    "Job",
    "Winning",
    "Resumes",
    "with",
    <>
      Resu<span className="text-blue-900">Muse</span>
    </>,]
  const navigate = useNavigate()

  const imgVariants = {
    center: { x: '0%', scale: 1, zIndex: 5 },
    left: { x: '-50%', scale: 0.7, zIndex: 1 },
    right: { x: '50%', scale: 0.7, zIndex: 1 }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setIndexes((prev) => {
        return prev.map(previndex => (previndex + 1) % 3)
      })
    }, 3000);
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <section className="relative h-screen w-screen">

        <div className="z-20 flex items-center gap-3 lg:flex-row max-lg:flex-col justify-center h-full backdrop-blur-sm p-4">
          <div className="md:w-1/2 max-lg:w-full text-center lg:text-left mr-3 relative">
            <h1 className="drop-shadow-2xl z-[40] text-blue-700/65 font-semibold font-serif md:text-6xl max-lg:text-4xl">
              {titleText.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.1 }}
                >
                  {letter}{" "}
                </motion.span>
              ))}
            </h1>
            <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-700/65 to-blue-900/85 blur-3xl opacity-50 pointer-events-none top-6 z-[-10] absolute inset-0"></div>
            <div className="relative z-50 mt-8 max-md:mb-4">
              <Button  size="lg" onPress={() => navigate("/templates")} variant="shadow" color="primary">
              <span className="font-medium ">Create Quick Resume</span>  
              </Button>
            </div>
          </div>

          <div className="w-auto relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center w-[18vw] relative"
            >
              {templateRoutes.map((temp, index) => (
                <motion.img
                  key={temp.templateId}
                  src={temp.imgUrl}
                  initial={"center"}
                  animate={positions[indexes[index]]}
                  variants={imgVariants}
                  transition={{ duration: 0.8 }}
                  className="pointer-events-none max-w-[14vw] max-md:min-w-32 drop-shadow-2xl rounded-md max-lg:top-0 absolute"
                  alt="Illustration of Resume Building"
                />
              ))}
            </motion.div>
          </div>
        </div>

      </section>

      <section className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="flex max-sm:flex-col justify-center  gap-5 text-blue-950 font-serif">
          <div className="shadow-blue-900/20 shadow-lg p-5 rounded-3xl ">
            <div className="mb-3">
              <h3 className="font-semibold text-xl ">AI-Powered Suggestions</h3>
              <h6 className="font-medium text-xs">Smart Assistance for Every Step</h6>
            </div>
            <p className=" text-sm ">Get AI-driven tips and recommendations to craft impactful resumes and cover letters. Highlight your achievements and get noticed by potential employers.</p>
          </div>

          <div className="shadow-blue-900/20 shadow-lg p-5 rounded-3xl ">
            <div className="mb-3">
              <h3 className="font-semibold text-xl ">Real-Time Previews</h3>
              <h6 className="font-medium text-xs">See Before You Apply</h6>
            </div>
            <p className=" text-sm ">Get AI-driven tips and recommendations to craft impactful resumes and cover letters. Highlight your achievements and get noticed by potential employers.</p>
          </div>

          <div className="shadow-blue-900/20 shadow-lg p-5 rounded-3xl ">
            <div className="mb-3">
              <h3 className="font-semibold text-xl ">No Sign-up Required</h3>
              <h6 className="font-medium text-xs">Your Information, Secure</h6>
            </div>
            <p className=" text-sm ">Get AI-driven tips and recommendations to craft impactful resumes and cover letters. Highlight your achievements and get noticed by potential employers.</p>
          </div>

        </motion.div>
      </section>
    </>

  );
};

export default Home;
