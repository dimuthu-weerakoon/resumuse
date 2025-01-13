import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Calendar, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import Custom from '../../types/Custom';
import { SocialLink } from '../../types/SocialLinks';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowCircleRight, faLink } from '@fortawesome/free-solid-svg-icons';
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






    const clearCust = () => {
        setTitle("");
        setStartDate("");
        setEndDate("");
        setDescription([]);
    };


    const handleUrls = () => {


        try {
            const newUrl: SocialLink = {
                platform: platform,
                link: link
            }
            setUrls(prev => [...prev, newUrl])

        } catch (err) {
            console.log(err)
        }


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

        console.log(customs);

        console.log(heading);



    }

    const handleNext = () => {
        navigate(`/templates/template/${templateId}/create/summery`);


    };
    const handleBack = () => {
        navigate(`/templates/template/${templateId}/create/experience`);
    };

    return (
        <motion.div initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, }} className='w-full'>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3'>

                    <Input type="text" label="Section Heading" value={heading} onChange={(e) => {

                        dispatch(setHeading(e.target.value))
                    }} />

                    <Input type="text" label="Title" value={title} onChange={(e) => {

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

                        <Select className="max-w-xs" value={platform}
                            onChange={e => setPlatform(e.target.value)} label="Select Platform">
                            <SelectItem value={"github"} key={"github"}
                                startContent={<FontAwesomeIcon icon={faGithub} color="black" />}>Github</SelectItem>
                            <SelectItem value={"linkedin"} key={"linkedin"}
                                startContent={<FontAwesomeIcon icon={faLinkedin} color="rgb(0 122 185)" />}>Linkedln</SelectItem>
                            <SelectItem value={"portfolio"} key={"portfolio"}
                                startContent={<FontAwesomeIcon icon={faLink} />}>Portfolio</SelectItem>
                        </Select>
                        <Input
                            size="md"
                            type="url"
                            label="URL"
                            value={link}
                            required
                            endContent={<Button isIconOnly onPress={handleUrls} >
                                <FontAwesomeIcon size="lg" icon={faArrowCircleRight} />
                            </Button>}
                            onChange={e => setLink(e.target.value)} />
                    </div>

                    <div className='p-2'>
                        <Button type="submit" variant='flat' color='secondary' className=' p-2' >
                            Add
                        </Button>
                    </div>
                </div>
            </form>

            <div className="flex justify-between">
                <Button onPress={handleBack} variant="flat">back</Button>
                <Button onPress={handleNext} variant="flat">next</Button>
            </div>
        </motion.div>
    );
};

export default InputCustom;
