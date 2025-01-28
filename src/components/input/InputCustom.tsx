import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import Custom from '../../types/Custom';
import { SocialLink } from '../../types/SocialLinks';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowCircleRight, faArrowLeft, faArrowRight, faLink, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addCustom, setHeading } from '../../redux/slices/CustomSlice';
import { motion } from 'framer-motion';


const InputCustom = ({ templateId }: { templateId: number }) => {

    const { heading, customs }: { heading: string, customs: Custom[] } = useSelector((state: any) => state.custom)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [description, setDescription] = useState<string[]>([]);
    const [urls, setUrls] = useState<SocialLink[]>([])
    const [currentInput, setCurrentInput] = useState<string>();
    const [platform, setPlatform] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [inValid, setInvalid] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>();





    const clearCustom = () => {
        setTitle("");
        setStartDate("");
        setEndDate("");
        setDescription([]);
        setUrls([])
    };


    const handleUrls = () => {
        const trimmedLink = link.trim();
        if (!platform && !trimmedLink) {
            setPlatform("");
            setLink("");
            setInvalid(false);
            setErrorMessage(null);
          
        }
        try {
            const checkUrl = new URL(trimmedLink)
            if (checkUrl.protocol !== "https:" || !platform) {
                setInvalid(true)
                setErrorMessage("Invalid URL")
                return
            }
            if ((platform === "github" && checkUrl.hostname !== "github.com")) {
                setInvalid(true)
                setErrorMessage("Enter a Valid Platform URL")
                return
            }
        } catch (error) {
            setInvalid(true)
            setErrorMessage("Invalid URL")
            return
        }
        if (!platform && !link) {
            setInvalid(false);
            setErrorMessage(null);
        }
        setInvalid(false);
        setErrorMessage(null);
        const newUrl: SocialLink = {
            platform: platform,
            link: link
        }
        setUrls(prev => [...prev, newUrl])
        setPlatform("")
        setLink("")
        console.log(urls)
    }


    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === ("Enter")) {
            const value = e.currentTarget.value.trim()
            if (value !== "") {
                setDescription(prevDesc => [...prevDesc, value])
                setCurrentInput("")
            }
            e.preventDefault()
            console.log(description);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newCustom: Custom = {
            title: title,
            dates: {
                startDate: startDate,
                endDate: endDate
            },
            urls: urls,
            description: description
        };
        dispatch(addCustom(newCustom))
        clearCustom()
    }

    const handleNext = () => {
        navigate(`/template/${templateId}/create/summery`);


    };
    const handleBack = () => {
        navigate(`/template/${templateId}/create/experience`);
    };

    return (
        <motion.div initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, }} className='w-full'>

            <div className="flex justify-between mb-4">
                <Button size='sm' onPress={handleBack} variant="flat" className='input-nav-btn'> <FontAwesomeIcon icon={faArrowLeft} /> </Button>
                <Button size='sm' onPress={handleNext} variant="flat" className='input-nav-btn'> <FontAwesomeIcon icon={faArrowRight} /> </Button>
            </div>

            <div className="mb-4">
                <h2 className=" input-heading">Highlights</h2>
                <p className="input-sub-heading">Showcase your unique accomplishments, such as research, projects, or other notable contributions.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3'>

                    <Input type="text" label="Section Heading (Projects,Researches...)" value={heading} onChange={(e) => {

                        dispatch(setHeading(e.target.value))
                    }} />

                    <Input type="text" label="Title (Project title,Research Title)" value={title} onChange={(e) => {

                        setTitle(e.target.value)
                    }} />


                    <div className='flex gap-2 flex-nowrap'>



                        <Input
                            label="Start Date"
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                        <Input

                            label="End Date"
                            type="date"
                            id="end-date"
                            value={endDate !== "present" ? endDate || "" : ""}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </div>

                    <div >

                        <Textarea
                            label="Description"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyUp={handleKeyUp}
                            placeholder="- Enter some decriptions about your work as a list and press Enter">
                        </Textarea>
                    </div>
                    <div className='flex w-full justify-center items-center gap-3 max-lg:flex-wrap'>

                        <Select value={platform}
                            onChange={e => setPlatform(e.target.value)} label="Select Platform">
                            <SelectItem value={"github"} key={"github"}
                                startContent={<FontAwesomeIcon icon={faGithub} color="black" />}>Github</SelectItem>
                            <SelectItem value={"portfolio"} key={"portfolio"}
                                startContent={<FontAwesomeIcon icon={faLink} />}>Website</SelectItem>
                        </Select>
                        <Input
                            size="md"
                            type="url"
                            label="URL"
                            value={link}
                            isInvalid={inValid}
                            errorMessage={errorMessage}
                            endContent={<Button isIconOnly onPress={handleUrls} >
                                <FontAwesomeIcon size="lg" icon={faArrowCircleRight} />
                            </Button>}
                            onChange={e => setLink(e.target.value)} />
                    </div>

                    <div className='p-2'>
                        <Button type="submit" variant='flat' className=' input-action-btn' >
                            <FontAwesomeIcon icon={faPlusCircle} />  Add
                        </Button>
                    </div>
                </div>
            </form>


        </motion.div>
    );
};

export default InputCustom;
