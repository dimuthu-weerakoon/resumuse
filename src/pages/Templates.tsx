import { motion } from "framer-motion"
import { templateRoutes } from "../TemplateRoutes/TemplateRoutes"
import { Link } from "react-router-dom"


const Templates = () => {
  return (
    <div className="h-screen ">

      <div className=" flex flex-col justify-center items-center  h-[80vh]">
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          exit={{ opacity: 0, x: -60 }}
          className="font-serif font-semiBold text-2xl mb-5 text-blue-900 z-20">Select Templates</motion.h1>
        <div className="flex justify-center flex-wrap gap-4 relative ">
          <div className=" bg-gradient-to-r from-indigo-500 from-30% via-sky-500 via-10% to-purple-500 to-10%  absolute blur-3xl bg-slate-500 w-[50vw] h-[50vh] rounded-full z-10"></div>
          {
            templateRoutes.map((template, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  scale: { type: "spring", visualDuration: 0.5, bounce: 0.5 },
                }}
                className="bg-blue-100/20 rounded shadow p-3 cursor-pointer z-40" key={index}>
                <Link to={`/${template.path}/create`}>
                  <motion.img
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.8 }} src={template.imgUrl} className=" max-w-40" alt="" />
                </Link>
              </motion.div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Templates