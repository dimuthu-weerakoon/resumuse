import { useState } from "react"
import { SocialLink } from "../../types/SocialLinks";
import { useDispatch } from "react-redux";
import { addSocialLink } from "../../redux/slices/SocialLinksSlice";
import { useNavigate } from "react-router";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faArrowCircleRight, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";




const InputSocialLink = ({ templateId }: { templateId: number }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [platform, setPlatform] = useState<string>('');
    const [link, setLink] = useState<string>('')
    const [inValid, setInvalid] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const handleSubmit = () => {


        try {
            const checkUrl = new URL(link)

            if (checkUrl.protocol !== "https:" || !platform) {
                setInvalid(true)
                setErrorMessage("Invalid URL")
                return
            }

            if (
                (platform === "linkedin" && checkUrl.hostname !== "linkedin.com") ||
                (platform === "github" && checkUrl.hostname !== "github.com")
            ) {
                setInvalid(true)
                setErrorMessage("Enter a Valid Platform URL")
                return
            }
        } catch (error) {
            setInvalid(true)
            setErrorMessage("Invalid URL")
            return
        }

        setInvalid(false);
        setErrorMessage(null);


        const socialLink: SocialLink = {
            platform: platform,
            link: link
        }

        dispatch(addSocialLink(socialLink))
        setPlatform("")
        setLink(" ")
    }
    const handleNext = () => {
        navigate(`/template/${templateId}/create/education`);


    };
    const handleBack = () => {
        navigate(`/template/${templateId}/create/contact-info`);
    };

    return (
        <motion.div initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, }} className=" w-full  ">
                  <div className="flex items-center justify-between mb-4">
                <Button onPress={handleBack} size="sm" variant="flat" className="input-nav-btn" > <FontAwesomeIcon icon={faArrowLeft} /> </Button>
                <Button onPress={handleNext} size="sm" variant="flat" className="input-nav-btn"> <FontAwesomeIcon icon={faArrowRight} /> </Button>
            </div>
            <div className="mb-4">
                <h2 className=" input-heading">Links</h2>
                <p className="input-sub-heading">Provide relevant links (e.g., portfolio, LinkedIn) to showcase your work and professional profile.</p>
            </div>
            <div className="flex w-full justify-center items-center gap-3 max-lg:flex-wrap">

                <Select required value={platform}
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
                    errorMessage={errorMessage}
                    isInvalid={inValid}
                    endContent={<Button isIconOnly onPress={handleSubmit} >
                        <FontAwesomeIcon className="text-blue-950" size="lg" icon={faArrowCircleRight} />
                    </Button>}
                    onChange={e => setLink(e.target.value)} />
            </div>

          

        </motion.div>
    )
}

export default InputSocialLink