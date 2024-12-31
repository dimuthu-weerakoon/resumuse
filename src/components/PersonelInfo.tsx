import { useSelector } from "react-redux";


const PersonelInfo = () => {
const personalInfo = useSelector((state:any)=>state.personalInfo)

  if (!personalInfo) return <div>Loading...</div>;

  return (
      <div>
          <h2>Personal Information</h2>
          <p>First Name: {personalInfo.firstName}</p>
          <p>Middle Name: {personalInfo.middleName}</p>
          <p>Last Name: {personalInfo.lastName}</p>
      </div>
  );
};

export default PersonelInfo;
