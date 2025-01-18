import { Outlet } from "react-router"






const TemplateBlock = () => {
    return (
        <div>
            <div className=" ">
                <div >
                    <Outlet />
                   
                </div>


            </div>




        </div>


    )
}

export default TemplateBlock