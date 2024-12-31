import { FormEvent, useState } from "react"
import { useSocialLink } from "../../context/social_links_context/SocialLinksContext"
import { SocialLink } from "../../types/SocialLinks";


const InputSocialLink = () => {



    const [platform, setPlatform] = useState<string>('');
    const [link, setLink] = useState<string>('')


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!platform || !link) {
            alert("Please select a platform and enter a valid link.");
            return;
        }

        const socialLink: SocialLink = {
            platform: platform,
            link: link
        }

        setPlatform("")
        setLink("")

    }

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
                        <option value="" disabled>
                            Select Platform
                        </option>
                        <option value="Github">Github</option>
                        <option value="Linkedin">Linkedin</option>
                        <option value="Email">Email</option>
                        <option value="Website">Website</option>
                    </select>
                </div>

                <div className="input-div flex items-center justify-center">
                    <label htmlFor="">Url</label>
                    <input type="url" className="rounded-s rounded-e-none" placeholder="https://" pattern="https://.*" onChange={e => setLink(e.target.value)} />

                   
                        <button type="button" className="text-white rounded-e translate-x-[-10%] border-2 border-black outline-none bg-black border-l rounded-none p-2" onClick={handleSubmit}>add</button>
                    
                </div>

            </div>



        </div>
    )
}

export default InputSocialLink