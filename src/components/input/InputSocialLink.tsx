import { FormEvent, useState } from "react"
import { SocialLink } from "../../types/SocialLinks";
import { useDispatch } from "react-redux";
import { addSocialLink } from "../../redux/slices/SocialLinksSlice";
import { useNavigate } from "react-router";


const InputSocialLink = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [platform, setPlatform] = useState<string>('');
    const [link, setLink] = useState<string>('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        try {
            const checkUrl = new URL(link)
            if (checkUrl.protocol !== "https:" || !platform) {
                alert(`Invalid URL : `)
                return
            }
        } catch (error) {
            alert(`Invalid URL : ${error}`)
            return
        }

        const socialLink: SocialLink = {
            platform: platform,
            link: link
        }
        dispatch(addSocialLink(socialLink))
        setPlatform("")
        setLink(" ")
    }
    const handleNext = () => {
        navigate("/create/education");
      };
      const handleBack = () => {
        navigate("/create/contact-info");
      };

    return (
        <div className="flex w-full  items-center">

            <div className="flex w-full justify-center items-center max-lg:flex-wrap">
                <div className="input-div">
                    <label htmlFor="">Platform</label>
                    <select
                        className="font-medium text-sm"
                        id="platform"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}>
                        <option value="" disabled selected>
                            Select Platform
                        </option>
                        <option value="github">Github</option>
                        <option value="linkedin">Linkedin</option>
                        <option value="portfolio">Portfolio</option>
                    </select>
                </div>

                <div className="input-div flex items-center justify-center">
                    <label htmlFor="">Url</label>
                    <input type="url" className="rounded-s rounded-e-none" value={link} placeholder="https://" pattern="https://.*" onChange={e => setLink(e.target.value)} />

                    <button type="button" className="text-white rounded-e translate-x-[-10%] border-2 border-black outline-none bg-black border-l rounded-none p-2" onClick={handleSubmit}>add</button>
                </div>
            </div>
            <button onClick={handleBack} >Back</button>

        <button onClick={handleNext} >Next</button>
        </div>
    )
}

export default InputSocialLink