

export default interface SummeryContextProps{
    summery:string
    addSummery:(summery:string)=>void;
    clearSummery:()=>void;
}