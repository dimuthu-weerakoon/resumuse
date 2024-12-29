import { FormEvent, useState } from "react"
import { useSocialLink } from "../../context/social_links_context/SocialLinksContext"
import { SocialLink } from "../../types/SocialLinks";


const InputSocialLink = () => {

    const { addSocialLink, socialLinks } = useSocialLink()

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
        addSocialLink(socialLink)
        setPlatform("")
        setLink("")
        console.log(socialLinks)
    }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="">Add Links</label>
                    <select
                        id="platform"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    >
                        <option value="" disabled>
                            Select Platform
                        </option>
                        <option value="Github">Github</option>
                        <option value="Linkedin">Linkedin</option>
                        <option value="Email">Email</option>
                        <option value="Website">Website</option>
                    </select>
                    <div>
                        <input type="url" pattern="https://.*" onChange={e => setLink(e.target.value)} />
                    </div>
                </div>

                <div>
                    <button type="button" onClick={handleSubmit}>add</button>
                </div>
            </form>
        </div>
    )
}

export default InputSocialLink