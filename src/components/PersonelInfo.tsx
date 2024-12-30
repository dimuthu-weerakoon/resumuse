import { useUniversal } from "../context/universal_context/UniversalContext";

const PersonelInfo = () => {
  const { personalInfoContextProps } = useUniversal();
  const { personalInfo } = personalInfoContextProps;

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
