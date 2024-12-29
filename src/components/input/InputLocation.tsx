import { LocationProps } from "../../types/Location"

const InputLocation = ({ location, setCity, setCountry, setState }: LocationProps) => {

    return (
        <div>

            <div>
                <div>
                    <label htmlFor="">City</label>
                    <input type="text" value={location?.city} onChange={(e) => setCity(e.target.value)} /></div>
                <div>
                    <label htmlFor="">State</label>
                    <input type="text" value={location?.state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Country</label>
                    <input type="text" value={location?.country} onChange={(e) => setCountry(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default InputLocation