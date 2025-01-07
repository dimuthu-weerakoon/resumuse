import { useState } from "react"
import { SocialLink } from "../../types/SocialLinks";
import { useDispatch } from "react-redux";
import { addSocialLink } from "../../redux/slices/SocialLinksSlice";
import { useNavigate } from "react-router";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const InputSocialLink = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [platform, setPlatform] = useState<string>('');
    const [link, setLink] = useState<string>('')

    const handleSubmit = () => {


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
        <div className=" w-full  ">

            <div className="flex w-full justify-center items-center gap-3 max-lg:flex-wrap">

                <Select className="max-w-xs" value={platform}
                    onChange={e => setPlatform(e.target.value)} label="Select Platform">
                    <SelectItem value={"github"} key={"github"}
                        startContent={<FontAwesomeIcon icon={faGithub} color="black" />}>Github</SelectItem>
                    <SelectItem value={"linkedin"} key={"linkedin"}
                        startContent={<FontAwesomeIcon icon={faLinkedin} color="rgb(0 122 185)" />}>Linkedln</SelectItem>
                    <SelectItem value={"portfolio"} key={"portfolio"}
                        startContent={<FontAwesomeIcon icon={faGlobe} />}>Portfolio</SelectItem>
                </Select>
                <Input
                    size="md"
                    type="url"
                    label="URL"
                    value={link}
                    required
                    endContent={<Button isIconOnly onPress={handleSubmit} >
                        <FontAwesomeIcon size="lg" icon={faArrowCircleRight} />
                    </Button>}
                    onChange={e => setLink(e.target.value)} />
            </div>

            <div className="flex items-center justify-between mt-4">
                <Button onPress={handleBack} variant="flat" color="secondary" >Back</Button>
                <Button onPress={handleNext} variant="flat" color="secondary" >Next</Button>
            </div>

        </div>
    )
}

export default InputSocialLink