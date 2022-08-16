import {debounce} from "../utils";
import { getPosition } from "../services/Geolocation";


export function Search({ apiCall, onResults, placeholder }) {
    
    const handleSearch = debounce(async (value) => {
        if (value.length > 3) {
            const data = await apiCall(value);
            onResults(data);
        }
    });

    const handleUseLocation = async () => {
        try {
            const pos = await getPosition();

            const newPos = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }

            console.log(newPos)
        } catch (err) {
            alert(err)
        }
   }

    return <div className="search__bar__wrapper">
        <input placeholder={placeholder || 'Aa'} onChange={(e) => handleSearch(e.target.value)} />
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleUseLocation}>
            <path d="M0 5.625L15 0L9.38375 15L7.5 7.5L0 5.625Z" fill="white"/>
        </svg>
    </div>
}
