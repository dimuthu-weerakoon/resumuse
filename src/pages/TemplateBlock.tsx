import { Outlet } from "react-router";

const TemplateBlock = () => {
  return (
    <div className="relative z-10 bg-blue-50/55">
     <div className=" bg-gradient-to-r from-blue-700/15 to-blue-400 from-30% translate-x-1/2 translate-y-1/2 absolute blur-3xl bg-slate-500 w-[50vw] h-[50vh] rounded-full z-[-1] "></div>
      <Outlet />
    </div>
  );
};

export default TemplateBlock;
