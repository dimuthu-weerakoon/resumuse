import { useSelector } from "react-redux"
import ContactInfo from "../types/ContactInfo"



const ContactInfoView = () => {
  const contactInfo: ContactInfo = useSelector((state: any) => state.contactInfo)
  return (
    <div>
      {contactInfo && (

        <ul>
          <li>{contactInfo.email}</li>
          <li>{contactInfo.phone}</li>
          <li className="break-words">{contactInfo.address},</li>
          <li>{contactInfo.location?.city}</li>
          <li> {contactInfo.location?.state} , {contactInfo.location?.country}</li>
        </ul>
      )
      }

    </div>




  )
}

export default ContactInfoView