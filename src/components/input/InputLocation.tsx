import { LocationProps } from "../../types/Location"

const InputLocation = ({ location, setCity, setCountry, setState }: LocationProps) => {

    return (
       

            <div className="flex max-lg:flex-wrap">
                <div className="input-div">
                    <label htmlFor="">City</label>
                    <input type="text" value={location?.city} onChange={(e) => setCity(e.target.value)} /></div>
                <div className="input-div">
                    <label htmlFor="">State</label>
                    <input type="text" value={location?.state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="input-div">
                    <label htmlFor="">Country</label>
                    <input type="text" value={location?.country} onChange={(e) => setCountry(e.target.value)} />
                </div>
        </div>
    )
}

export default InputLocation