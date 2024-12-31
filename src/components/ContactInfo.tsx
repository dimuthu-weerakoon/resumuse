import { useSelector } from "react-redux"
import ContactInfo from "../types/ContactInfo"


const ContactInfoView = () => {
  const contactInfo:ContactInfo = useSelector((state:any)=>state.contactInfo)
  return (
    <div>
      <h3>Contact Info</h3>
      <ul>
        <li>Phone :{contactInfo.phone}</li>
        <li> Address : {contactInfo.address}</li>
        <li>City : {contactInfo.location?.city}</li>
        <li>State : {contactInfo.location?.state}</li>
        <li>Country : {contactInfo.location?.country}</li>
      </ul>
    </div>
  )
}

export default ContactInfoView