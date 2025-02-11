
import { Outlet } from 'react-router'


const InputSteps = () => {

    return (
        <div
            className=" flex my-2 mx-2 max-md:mx-auto rounded-lg bg-blue-200/35  backdrop-blur-xl flex-col justify-between items-start  p-4 w-full">
            {/* Input Components */}
            <Outlet />

        </div>

    )
}

export default InputSteps