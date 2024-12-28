import { ExpProvider } from "../context/exp_context/ExpContext"
import { SkillProvider } from "../context/skill_context/SkillContext"
import InputExperience from "./input/InputExperience"



const InputDetails = () => {


  return (
    <>
      <div>
        <div>
          <div>
            <label htmlFor="">First Name</label>
            <input type="text" id="firstname" className="" />
          </div>
          <div>
            <label htmlFor="">Last Name</label>
            <input type="text" id="lastname" className="" />
          </div>
        </div>


        <div>
          <label htmlFor="">Subtitle</label>
          <input type="text" id="subtitle" className="" />
        </div>

        <div>
          <label htmlFor="">Links</label>
          <select name="" id="">
            <option value="">select platform</option>
            <option value="">website</option>
            <option value="">linkdlen</option>
            <option value="">Email</option>
            <option value="">github</option>
          </select>
        </div>


        <div>
          <label htmlFor="">resident</label>
          <input type="text" id="resitent" className="" />
        </div>
        <div>
          <div>
            <label htmlFor="">City</label>
            <input type="text" id="city" className="" /></div>
          <div>
            <label htmlFor="">State</label>
            <input type="text" id="state" className="" />
          </div>
        </div>

        <div>
          <label htmlFor="">Summery</label>
          <textarea name="" id=""></textarea>
        </div>



        <ExpProvider>
          <SkillProvider>
            <InputExperience />

          </SkillProvider>

        </ExpProvider>


      </div>


    </>

  )
}

export default InputDetails