
import { Outlet } from 'react-router'

const InputSteps = () => {
    return (
     
            <div className="flex flex-col justify-between items-start p-4 m-4 w-full">
                <Outlet />
            </div>
       
    )
}

export default InputSteps