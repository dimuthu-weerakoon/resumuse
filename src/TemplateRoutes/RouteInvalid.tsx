
import { Navigate, Outlet } from "react-router"


const RouteInvalid = ({ templateId }: { templateId: number }) => {

    const allowedIds: number[] = [2]; // template id's  allowed
    //checking  if allowed id has not given template id 
    if (!allowedIds.includes(templateId)) {
        // if true navigate route not found
        return <Navigate to="*" replace />
    }

    // return outlets
    return <Outlet />

}

export default RouteInvalid