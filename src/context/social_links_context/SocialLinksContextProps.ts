import { SocialLink } from "../../types/SocialLinks";

export interface SocialLinksContextProps {
    socialLinks: SocialLink[];
    addSocialLink: (socialLink:SocialLink) => void;
    removeSocialLink: (socialLink:SocialLink) => void;
}