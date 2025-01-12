import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBriefcase, faContactBook, faEnvelope, faGraduationCap, faHome, faLanguage, faLink, faPeopleGroup, faPhone, faProjectDiagram, faUserCircle, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Template2Preview = () => {
  return (

<div className=" w-[21cm] h-[29.7cm]">
<div className="shadow-lg p-4 font-serif h-[100%]">
      <div className="grid grid-cols-3 h-full">

        <div className="bg-slate-50 h-full p-8 rounded-s-md">
          <div className="flex justify-center items-start">
            <img
              className="w-36 h-36  object-cover object-top border-2 border-white rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"
              alt=""
            />
          </div>
          <div className="flex justify-center mt-4 mb-10 items-center ">
            <h3 className="text-gray-800 font-semibold text-xl text-center">Dimuthu Dhanajana Weerakoon</h3>
          </div>


          <div className="flex flex-col mb-2">
            <h3 className="mb-2 font-medium"><FontAwesomeIcon icon={faContactBook} size="sm" className="mr-2" /> Contact Infomation</h3>

            <div className="bg-slate-100 p-4 rounded-md">
              <ul className="text-xs italic">
                <li className="mb-2">21/30,Nawa Niwasa, Maussagolla, Passara</li>
                <li className="mb-2">076-977-7242</li>
                <li className="mb-2 "><FontAwesomeIcon icon={faEnvelope} size="sm" className="mr-2" />dimu@gmail.com</li>
                <li className="mb-2"><FontAwesomeIcon icon={faLinkedin} size="sm" className="mr-2" />linkedin.com</li>
                <li className="mb-2"><FontAwesomeIcon icon={faGithub} size="sm" className="mr-2" />github.com</li>

              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-2 font-medium"><FontAwesomeIcon icon={faLanguage} size="sm" className="mr-2" /> Languages</h3>

            <div className="bg-slate-100 p-4 rounded-md">
              <ul className="text-sm">
                <li className="mb-2">English</li>
                <li className="mb-2">Spanish</li>
                <li className="mb-2">French</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-2 font-medium"><FontAwesomeIcon icon={faPeopleGroup} size="sm" className="mr-2" /> Refrees</h3>

            <div className="bg-slate-100 p-4 rounded-md ">
              <div className="flex flex-col mb-2">
                <h4 className="font-medium">Mr. John Doe</h4>
                <span className="text-sm ">Tech Lead</span>
                <span className="text-xs">Microsoft - <span className="italic">Colombo, Sri Lanka</span></span>
                <span className="text-xs italic">johndoe@outlook.com</span>
                <span className="text-xs italic">076-875-7756</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-medium">Mr. Tom Jacks</h4>
                <span className="text-sm ">Project Manager</span>
                <span className="text-xs">HCL Tech - <span className="italic">Colombo, Sri Lanka</span></span>
                <span className="text-xs italic">tomjacks@outlook.com</span>
                <span className="text-xs italic">076-456-6745</span>
              </div>
            </div>
          </div>


        </div>


        <div className="bg-slate-100 col-span-2 p-8 rounded-e-md">

          <div className="mb-2">
            <h3 className="mb-2"><FontAwesomeIcon icon={faUserTie} size="sm" className="mr-2" />
              <span className="font-medium">Profile</span>
            </h3>

            <p className="bg-slate-50 p-4 rounded-md text-xs text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore quisquam, minus voluptatum quod voluptate architecto blanditiis optio est officia rerum, saepe ratione rem qui consectetur sed fugiat cumque earum? Amet.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore quisquam, minus voluptatum quod voluptate architecto blanditiis optio est officia rerum, saepe ratione rem qui consectetur sed fugiat cumque earum? Amet.</p>
          </div>

          <div className="mb-2">
            <h3 className="mb-2"><FontAwesomeIcon icon={faBriefcase} size="sm" className="mr-2" />
              <span className="font-medium">Work Experience</span>
            </h3>
            <div className="bg-slate-50 p-4 rounded-md ">

              <div className="flex flex-col mb-2" >
                <h4 className="font-medium text-sm">Sun Micro Systems pvt Ltd.</h4>
                <span className="text-[0.65rem]">Jan 2020 - March 2022</span>
                <span className="text-[0.65rem]">Los Angeles , CA</span>
                <h5 className="text-xs font-medium">Senior Software Engineer</h5>
                <ul className="text-xs">
                  <li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                  <li>- Lorem ipsum dolor sit amet consectetur adipisicing elit. error exercitationem quas.</li>
                  <li>- Lorem ipsum dolor sit amet consectetur adipisicing .</li>
                  <li>- Lorem ipsum dolor sit amet.</li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="font-medium text-sm">ServerClub.lk  pvt Ltd.</h4>
                <span className="text-[0.65rem]">Jan 2020 - March 2022</span>
                <span className="text-[0.65rem]">Los Angeles , CA</span>
                <h5 className="text-xs font-medium">Cloud Engineer</h5>
                <ul className="text-xs">
                  <li>- Lorem ipsum dolor sit amet.</li>
                  <li>- Lorem ipsum dolor sit amet consectetur.</li>
                  <li>- Lorem ipsum .</li>
                  <li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2"><FontAwesomeIcon icon={faGraduationCap} size="sm" className="mr-2" />
              <span className="font-medium"> Education and Academic Qualification</span>
            </h3>
            <div className="bg-slate-50 p-4 rounded-md ">

              <div className="flex flex-col mb-2" >
                <h4 className="font-medium text-sm">Bsc Hons Information Technology.</h4>
                <h5 className="text-xs font-medium">SIBA Campus</h5>
                <span className="text-[0.65rem]">Jan 2020 - March 2022</span>
                <span className="text-[0.65rem]">Los Angeles , CA</span>

                <ul className="text-xs">
                  <li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                  <li>- Lorem ipsum dolor sit amet consectetur.</li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="font-medium text-sm">Higher National Diploma</h4>
                <h5 className="text-xs font-medium">Sri Lanka Institute of Advanced Technological Education</h5>
                <span className="text-[0.65rem]">Jan 2020 - March 2022</span>
                <span className="text-[0.65rem]">Los Angeles , CA</span>
              </div>
            </div>
          </div>


        </div>

      </div>
    </div>
    </div>
  
  );
};

export default Template2Preview;
