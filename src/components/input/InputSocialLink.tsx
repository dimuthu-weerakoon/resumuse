import { useEffect, useState } from "react";
import { SocialLink } from "../../types/SocialLinks";
import { useDispatch, useSelector } from "react-redux";
import { addSocialLink, clearEditingLink, updateSocialLink } from "../../redux/slices/SocialLinksSlice";
import { useNavigate } from "react-router";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { faArrowCircleRight, faArrowLeft, faArrowRight, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { iconNames } from "../../common_functions/SocialIconObject";
import { socialPlatforms } from "../../common_functions/SocialPlatforms";

const InputSocialLink = ({ templateId }: { templateId: number }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [platform, setPlatform] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [inValid, setInvalid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { editingLink }: { editingLink: SocialLink | null } = useSelector((state: any) => state.socialLink);
    const editMode: boolean = useSelector((state: any) => state.editmode);



    useEffect(() => {
        if (editMode && editingLink) {
            setPlatform(editingLink.platform);
            setLink(editingLink.link);
        } else {
            setPlatform("");
            setLink("");
        }
    }, [editMode, editingLink]);

    useEffect(() => {
        if (!editMode) {
            dispatch(clearEditingLink())
            setPlatform("");
            setLink("");
        }
    }, [editMode, dispatch])
    const handleSubmit = (isEdit: boolean) => {
        try {
            const checkUrl = new URL(link);
            if (checkUrl.protocol !== "https:" || !platform) {
                throw new Error("Invalid URL");
            }

            if (
                (platform === "linkedin" && checkUrl.hostname !== "linkedin.com") ||
                (platform === "github" && checkUrl.hostname !== "github.com")
            ) {
                throw new Error("Enter a valid platform URL");
            }

            setInvalid(false);
            setErrorMessage(null);

            const socialLink: SocialLink = { platform, link };
            dispatch(isEdit ? updateSocialLink(socialLink) : addSocialLink(socialLink));

            setPlatform("");
            setLink("");
        } catch (error: any) {
            setInvalid(true);
            setErrorMessage(error.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="w-full"
        >
            <div className="flex items-center justify-between mb-4">
                <Button onPress={() => navigate(`/template/${templateId}/create/contact-info`)} size="sm" variant="flat" className="input-nav-btn">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <Button onPress={() => navigate(`/template/${templateId}/create/education`)} size="sm" variant="flat" className="input-nav-btn">
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </div>

            <div className="mb-4">
                <h2 className="input-heading">Links</h2>
                <p className="input-sub-heading">Provide relevant links (e.g., portfolio, LinkedIn) to showcase your work and professional profile.</p>
            </div>

            <div className="flex w-full justify-center items-center gap-3 max-lg:flex-wrap">
                <Select
                    selectedKeys={new Set(platform ? [platform] : [])}
                    required
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    label="Select Platform"
                >
                    {socialPlatforms.map((social) => (
                        <SelectItem
                            key={social.platform}
                            value={social.platform}
                            isDisabled={editMode && platform !== social.platform}
                            startContent={
                                <FontAwesomeIcon icon={iconNames[social.platform]} color={social.color} />
                            }
                        >
                            {social.Label}
                        </SelectItem>
                    ))}
                </Select>

                <Input
                    size="md"
                    type="url"
                    label="URL"
                    value={link}
                    errorMessage={errorMessage}
                    isInvalid={inValid}
                    endContent={
                        <Button isIconOnly onPress={() => handleSubmit(editMode)}>
                            <FontAwesomeIcon
                                className="text-blue-950"
                                size="lg"
                                icon={editMode ? faRepeat : faArrowCircleRight}
                            />
                        </Button>
                    }
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>
        </motion.div>
    );
};

export default InputSocialLink;
