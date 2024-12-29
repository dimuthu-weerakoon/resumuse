import { createContext, useContext, useState } from 'react'
import { SocialLinksContextProps } from './SocialLinksContextProps'
import CommonProviderProps from '../CommonProviderProps'
import { SocialLink } from '../../types/SocialLinks'

export const SocialLinksContext = createContext<SocialLinksContextProps>({
    socialLinks: [],
    addSocialLink: () => void {},
    removeSocialLink: () => void {}
})

export const SocialLinksProvider = ({ children }: CommonProviderProps) => {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

    const addSocialLink = (socialLink: SocialLink) => {
        setSocialLinks(prevSocialLink => [...prevSocialLink, socialLink])
    }

    const removeSocialLink = (socialLink: SocialLink) => {

        setSocialLinks(pevSocialLink => pevSocialLink.filter(socialLink => socialLink !== socialLink))
    }

    return (
        <SocialLinksContext.Provider value={{socialLinks,addSocialLink,removeSocialLink}}>
            {children}
        </SocialLinksContext.Provider>
    )
}

export function useSocialLink(){
    return useContext(SocialLinksContext)
}