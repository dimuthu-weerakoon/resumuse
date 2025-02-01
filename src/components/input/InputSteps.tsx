
import { Outlet } from 'react-router'


const InputSteps = () => {

    return (
        <div
         className=" flex m-2 rounded-lg bg-blue-200/35  backdrop-blur-xl flex-col justify-between items-start  p-4 w-full">
            <Outlet />
          
        </div>

    )
}

export default InputSteps