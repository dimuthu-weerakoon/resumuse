import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Footer = () => {
  return (
    <div className=" flex justify-between items-center p-6 bg-blue-950/10">
    <div className="text-blue-950 font-medium ">
    Copyright &copy; 2025 ResuMuse
    </div>
    <div>
        <ul className="flex text-blue-950 justify-center items-center gap-4">
            <li className="hover:scale-150 transition-all "><a href="#" target="_blank" ><FontAwesomeIcon size="lg" icon={faFacebook}/></a></li>
            <li className="hover:scale-150 transition-all "><a href="#" target="_blank"><FontAwesomeIcon size="lg" icon={faEnvelope}/></a></li>

        </ul>
    </div>
       
    </div>
  )
}

export default Footer