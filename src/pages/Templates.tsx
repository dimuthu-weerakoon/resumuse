import { motion } from "framer-motion"
import { templateRoutes } from "../TemplateRoutes/TemplateRoutes"
import { Link } from "react-router-dom"


const Templates = () => {
  return (
    <div className="h-screen ">

      <div className=" flex flex-col justify-center items-center  h-[80vh]">
        <h1 className="font-serif font-semiBold text-4xl mb-5 text-blue-50 z-20">Select Templates</h1>
        <div className="flex justify-center flex-wrap gap-4 relative ">
          <div className=" bg-gradient-to-r from-indigo-500 from-30% via-sky-500 via-10% to-purple-500 to-10%  absolute blur-3xl bg-slate-500 w-[50vw] h-[50vh] rounded-full z-10"></div>
          {
            templateRoutes.map((template, index) => (
              <div className="bg-blue-100/20 rounded shadow p-3 cursor-pointer z-40" key={index}>
                <Link to={`/${template.path}/create`}>
                  <motion.img
                    whileHover={{ scale: 1.5 }}

                    whileTap={{ scale: 0.8 }} src={template.imgUrl} className=" max-w-40" alt="" />
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Templates