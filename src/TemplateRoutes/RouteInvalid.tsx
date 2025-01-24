import { useEffect } from "react";
import { Navigate, Outlet } from "react-router"


const RouteInvalid = ({ templateId }: { templateId: number }) => {


    const allowedIds: number[] = [2];



    if (!allowedIds.includes(templateId)) {
        return <Navigate to="*" replace />
    }


    return <Outlet />

}

export default RouteInvalid