import { useSelector } from "react-redux";


const PersonelInfo = () => {
  const personalInfo = useSelector((state: any) => state.personalInfo)

  if (!personalInfo) return <div>Loading...</div>;

  return (
    <div >
      <h4 className="font-semibold capitalize  text-2xl"> {personalInfo.firstName} {personalInfo.middleName} {personalInfo.lastName}</h4>
    </div>
  );
};

export default PersonelInfo;
