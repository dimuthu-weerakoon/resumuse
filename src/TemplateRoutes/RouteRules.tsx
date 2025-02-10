import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router"

const RouteRules = ({ templateId }: { templateId: number }) => {

    const navigate = useNavigate()
    //allowed template ids
    const AllowedIds: number[] = [1, 3]
    // navigate to next component
    const handleNext = () => {
        //if allowed id has current tempalte id navigate to finalize else navigate to refrees
        const nextRoute = AllowedIds.includes(templateId) ?
            `/template/${templateId}/create/finalize`
            : `/template/${templateId}/create/refrees`
        // execute logic 
        navigate(nextRoute)
    }

    return (
        //return button for navigate
        <Button size="sm" onPress={handleNext} variant="flat" className="input-nav-btn"> <FontAwesomeIcon icon={faArrowRight} /> </Button>

    )

}

export default RouteRules