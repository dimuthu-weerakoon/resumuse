import { useSelector } from "react-redux"
import { SocialLink } from "../types/SocialLinks"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"

const Social = () => {
  const iconNames: any = {
    github: faGithub,
    linkedin: faLinkedin,
    portfolio:faGlobe
  }
  const socialLinks: SocialLink[] = useSelector((state: any) => state.socialLink)

  return (
    <>
      {socialLinks &&
        <ul className="text-[0.65rem] flex gap-5">
          {socialLinks.map((social, index) => (
            <li key={index}><FontAwesomeIcon icon={iconNames[social.platform]} /> <a className="italic hover:underline" href={social.link} target="_blank">{social.link}</a> </li>
          ))}
        </ul>
      }
    </>
  )
}

export default Social