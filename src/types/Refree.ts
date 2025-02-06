import { Location } from "./Location";



export interface Refree{
    refreeName:string;
    positions:string;
    institute:string;
    location?:Location|null
    email:string
    phone:string
}