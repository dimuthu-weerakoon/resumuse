import { motion } from "framer-motion"
import { templateRoutes } from "../TemplateRoutes/TemplateRoutes"
import { Link } from "react-router-dom"


const Templates = () => {
  return (
    <div className="h-screen p-6">

      <div className=" flex flex-col justify-center items-center  h-[80vh]">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          exit={{ opacity: 0 }}
          className="font-serif font-semiBold text-2xl mb-5 text-blue-900 z-20 text-center">Choose from a wide variety of professional, modern, and creative templates designed to make your resume stand out.</motion.h1>
        <div className="flex justify-center flex-wrap gap-4 relative ">
          <div className=" bg-gradient-to-r from-blue-900/10 from-30%  absolute blur-3xl bg-slate-500 w-[50vw] h-[50vh] rounded-full z-10"></div>
          {
            templateRoutes.map((template, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  scale: { type: "spring", visualDuration: 0.5, bounce: 0.5 },
                }}
                className="bg-white/20 rounded shadow p-3 cursor-pointer z-40" key={index}>

                <Link to={`/${template.path}/create`}>
                  <motion.img
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.8 }} src={template.imgUrl} className="md:max-w-44 max-lg:max-w-40" alt="" />
                </Link>

                <div>
                  <div>
                    <h3 className="font-medium text-blue-950">Modern</h3>
                    
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Templates