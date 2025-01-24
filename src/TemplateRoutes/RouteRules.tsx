import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router"


const RouteRules = ({ templateId }: { templateId: number }) => {

    const navigate = useNavigate()


    const AllowedIds: number[] = [1, 3]

    const handleNext = () => {
        const nextRoute = AllowedIds.includes(templateId) ?
            `/template/${templateId}/create/finalize`
            : `/template/${templateId}/create/refrees`

        navigate(nextRoute)
    }

    return (
        <Button onPress={handleNext} variant="flat" className="input-nav-btn"> <FontAwesomeIcon icon={faArrowRight} /> </Button>

    )

}

export default RouteRules