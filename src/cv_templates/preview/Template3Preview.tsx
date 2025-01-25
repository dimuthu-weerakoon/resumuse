import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Template3Preview = () => {
  return (
    <div className=" w-[21cm] h-[29.7cm]  ">
      <div className="p-8 font-sans-serif w-full h-full bg-white">
        <div className="mb-4">
          <h3 className="font-semibold text-xl -tracking-tighter capitalize">John Doe</h3>
          <ul className="flex gap-2 font-light text-xs italic">
            <li>City,Country</li>
            <li>| 097-890-5678</li>
            <li>| johndoe@gmail.com</li>
          </ul>
          <ul className="flex gap-2 font-light text-xs italic">
            <li>github</li>
            <li>| linkedin</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-lg -tracking-tighter uppercase">Carrer Overview</h3>
          <hr className="border-blue-900 border-1 mb-2" />
          <p className="text-sm text-justify font-light">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
            doloribus nostrum, perferendis ducimus eos minus officia in suscipit
            laudantium distinctio debitis repudiandae sint molestias repellat
            est dolorum, itaque iusto saepe.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-lg -tracking-tighter uppercase">Work Experience</h3>
          <hr className="border-blue-900 border-1 mb-2"/>
          <div className="mb-2">
            <div className="flex justify-between flex-nowrap">
              <div className="flex gap-2 items-center">
              <h4 className="font-medium text-sm">Comapny name </h4>
              <span className="font-medium text-xs italic">(city,country)</span>
              </div>
              
              <span className="font-medium text-sm">mm yyyy - mm yyyy</span>
            </div>
            <h5 className="font-medium text-sm">Job Title</h5>
            <ul className="text-xs font-light">
              <li>Lorem ipsum dolor sit amet co gg moyll lgppeppb</li>
              <li>Lorem ipsum dolor sit amet co gg moyll lgppeppb</li>
              <li>Lorem ipsum dolor sit amet co gg moyll lgppeppb</li>
              <li>Lorem ipsum dolor sit amet co gg moyll lgppeppb</li>
            </ul>
            <div className="flex items-center gap-3">
            <h5 className="text-sm font-medium mt-1">Improved skills: </h5>
            <span className="text-sm ">js, python, java </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-lg -tracking-tighter uppercase">section name</h3>
          <hr className="border-blue-900 border-1 mb-2"/>
          <div>
            <div className="flex justify-between flex-nowrap">
              <h5 className="font-medium text-sm">Project or research</h5>
              <span className="font-medium text-sm" >mm yyyy - mm yyyy</span>
            </div>
            <ul className="flex items-center gap-3 text-xs italic">
              <li>platform link</li>
              <li>platform link</li>
            </ul>
            <ul className="text-xs font-light mt-1">
              <li>Lorem ipsum dolor sit amet co gg moyll lgppeppb</li>
              <li>Lorem ipsum dolor sit amet co gg moyll lgppeppb</li>
              <li>Lorem ipsum dolor sit amet co gg moyll lgppeppb</li>
              <li>Lorem ipsum dolor sit amet co gg moyll lgppeppb</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-lg -tracking-tighter uppercase">Education</h3>
          <hr className="border-blue-900 border-1 mb-2"/>
          <div className="mb-2">
            <div className="flex justify-between flex-nowrap mb-1">
              <h5 className="text-sm font-medium">Qualification name</h5>
              <span className="font-medium text-sm">mm yyyy - mm yyyy</span>
            </div>

            <p className="text-xs font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              dignissimos animi incidunt aperiam minima. Qui nihil ab cum in
              rerum nesciunt aperiam maxime omnis debitis, numquam eos commodi
              fuga blanditiis!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3Preview;
