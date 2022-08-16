import { useMemo, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Search } from '../components/Search';
import { searchLocations } from '../Api';
import { throttle } from '../utils';
import {Selectable} from '../components/Selectable';
import { user } from "../services/User";

export function Map() {

    const navigate = useNavigate();
    const searchWrapper = useRef(null);
    const [ results, setResults ] = useState([]);
    const [ verified, setVerified ] = useState(false);

    const searchFiller = [
        "I have an ex that says everything is black and white. Personally I always thought they were a bit psycho...",
        "I never trust ghosts, I see right through them...",
        "No results? Boo hoo..."
    ];

    const fillerText = searchFiller[Math.floor(Math.random() * searchFiller.length)];
    
    const handleResults = (res) => {
        setResults(res);
    }

    const center = {
        lat: 49.25,
        lng: -84.5
    }
    
    const mapOptions = {
        disableDefaultUI: true,
        minZoom: 3,
    }

    const handleBoundsChanged = throttle((e) => {
        console.log(e);
    });

    const toggleSearch = () => searchWrapper.current.classList.toggle("open");

    const map = useMemo(() => <GoogleMap
        mapContainerClassName="map"
        zoom={10}
        clickableIcons={false}
        onBoundsChanged={handleBoundsChanged}
        options={mapOptions}
        center={center}
    ></GoogleMap>, []);

    return <div className="map__page__container">
        {map}
        <div ref={searchWrapper} className="map__page__search__wrapper">
            <div className="map__page__search__wrapper__inner__content">
                <div className="map__page__search__tools">
                    <Search 
                        apiCall={(term) => searchLocations({term, verified})}
                        onResults={handleResults}
                        placeholder="Search location here..."
                    />
                    <Button color="none" onClick={() => setVerified(!verified)}>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path color={verified ? "var(--bg-red)" : "white"} d="M10.5 1.75C8.41142 1.75 6.40838 2.57968 4.93153 4.05653C3.45468 5.53338 2.625 7.53642 2.625 9.625C2.625 12.2762 3.96375 14.7175 6.125 16.1612V19.25H7.875V16.625H9.625V19.25H11.375V16.625H13.125V19.25H14.875V16.1525C17.0363 14.7087 18.375 12.25 18.375 9.625C18.375 7.53642 17.5453 5.53338 16.0685 4.05653C14.5916 2.57968 12.5886 1.75 10.5 1.75ZM7 9.625C7.46413 9.625 7.90925 9.80937 8.23744 10.1376C8.56563 10.4658 8.75 10.9109 8.75 11.375C8.75 11.8391 8.56563 12.2842 8.23744 12.6124C7.90925 12.9406 7.46413 13.125 7 13.125C6.53587 13.125 6.09075 12.9406 5.76256 12.6124C5.43437 12.2842 5.25 11.8391 5.25 11.375C5.25 10.9109 5.43437 10.4658 5.76256 10.1376C6.09075 9.80937 6.53587 9.625 7 9.625ZM14 9.625C14.4641 9.625 14.9092 9.80937 15.2374 10.1376C15.5656 10.4658 15.75 10.9109 15.75 11.375C15.75 11.8391 15.5656 12.2842 15.2374 12.6124C14.9092 12.9406 14.4641 13.125 14 13.125C13.5359 13.125 13.0908 12.9406 12.7626 12.6124C12.4344 12.2842 12.25 11.8391 12.25 11.375C12.25 10.9109 12.4344 10.4658 12.7626 10.1376C13.0908 9.80937 13.5359 9.625 14 9.625ZM10.5 12.25L11.8125 14.875H9.1875L10.5 12.25Z" fill="white"/>
                        </svg>
                    </Button>
                </div>
                {
                    results.length > 0 
                        ? <div className="map__search__results__grid">
                            {
                                results.map((result, index) => <Selectable
                                    key={"result_" + result.name}
                                    title={result.name}
                                    imageSrc={result.images && result.images[0] || "https://unsplash.it/200"}
                                    onClick={() => navigate("/location/" + result.id)}
                                />)
                            }
                        </div>
                        : <div className="map__search__filler__text">{fillerText}</div>
                }
                <Button color="red" onClick={toggleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-3.148 0-6 2.553-6 5.702 0 4.682 4.783 5.177 6 12.298 1.217-7.121 6-7.616 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 16l-6.707-2.427-5.293 2.427-5.581-2.427-6.419 2.427 4-9 3.96-1.584c.38.516.741 1.08 1.061 1.729l-3.523 1.41-1.725 3.88 2.672-1.01 1.506-2.687-.635 3.044 4.189 1.789.495-2.021.465 2.024 4.15-1.89-.618-3.033 1.572 2.896 2.732.989-1.739-3.978-3.581-1.415c.319-.65.681-1.215 1.062-1.731l4.021 1.588 3.936 9z"/></svg>
                    Back to Map
                </Button>
            </div>
        </div>
        <div className="map__page__tools__container">
            { user.isAdmin && <Button color="blue" onClick={() => navigate('/admin')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path d="M23.269 19.743l-11.945-11.945c-.557-.557-.842-1.33-.783-2.115.115-1.485-.395-3.009-1.529-4.146-1.03-1.028-2.376-1.537-3.723-1.537-.507 0-1.015.072-1.505.216l3.17 3.17c.344 1.589-1.959 3.918-3.567 3.567l-3.169-3.17c-.145.492-.218 1-.218 1.509 0 1.347.51 2.691 1.538 3.721 1.135 1.136 2.66 1.645 4.146 1.53.783-.06 1.557.226 2.113.783l11.946 11.944c.468.468 1.102.73 1.763.73 1.368 0 2.494-1.108 2.494-2.494 0-.638-.244-1.276-.731-1.763zm-1.769 2.757c-.553 0-1-.448-1-1s.447-1 1-1c.553 0 1 .448 1 1s-.447 1-1 1zm-7.935-15.289l5.327-5.318c.584-.585 1.348-.878 2.113-.878.764 0 1.529.292 2.113.878.589.587.882 1.357.882 2.125 0 .764-.291 1.528-.873 2.11l-5.326 5.318-4.236-4.235zm-3.53 9.18l-5.227 5.185c-.227.23-.423.488-.574.774l-.301.58-2.1 1.07-.833-.834 1.025-2.146.58-.302c.286-.15.561-.329.79-.558l5.227-5.185 1.413 1.416z"/></svg>
                Admin
            </Button>}
            { user.id && <Button color="dark" onClick={() => navigate('/profile/'+ user.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"/></svg>
                Profile
            </Button> } 
            <Button color={verified ? "red" : "dark"} onClick={() => setVerified(!verified)}>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 1.75C8.41142 1.75 6.40838 2.57968 4.93153 4.05653C3.45468 5.53338 2.625 7.53642 2.625 9.625C2.625 12.2762 3.96375 14.7175 6.125 16.1612V19.25H7.875V16.625H9.625V19.25H11.375V16.625H13.125V19.25H14.875V16.1525C17.0363 14.7087 18.375 12.25 18.375 9.625C18.375 7.53642 17.5453 5.53338 16.0685 4.05653C14.5916 2.57968 12.5886 1.75 10.5 1.75ZM7 9.625C7.46413 9.625 7.90925 9.80937 8.23744 10.1376C8.56563 10.4658 8.75 10.9109 8.75 11.375C8.75 11.8391 8.56563 12.2842 8.23744 12.6124C7.90925 12.9406 7.46413 13.125 7 13.125C6.53587 13.125 6.09075 12.9406 5.76256 12.6124C5.43437 12.2842 5.25 11.8391 5.25 11.375C5.25 10.9109 5.43437 10.4658 5.76256 10.1376C6.09075 9.80937 6.53587 9.625 7 9.625ZM14 9.625C14.4641 9.625 14.9092 9.80937 15.2374 10.1376C15.5656 10.4658 15.75 10.9109 15.75 11.375C15.75 11.8391 15.5656 12.2842 15.2374 12.6124C14.9092 12.9406 14.4641 13.125 14 13.125C13.5359 13.125 13.0908 12.9406 12.7626 12.6124C12.4344 12.2842 12.25 11.8391 12.25 11.375C12.25 10.9109 12.4344 10.4658 12.7626 10.1376C13.0908 9.80937 13.5359 9.625 14 9.625ZM10.5 12.25L11.8125 14.875H9.1875L10.5 12.25Z" fill="white"/>
                </svg>
                Verified
            </Button> 
            <Button color="dark" onClick={toggleSearch}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1344_329)">
                        <path d="M21.1851 18.3865L16.6228 13.8242C17.5074 12.4309 18.0189 10.7791 18.0189 9.01083C18.0189 4.0425 13.9773 0 9.009 0C4.04067 0 0 4.0425 0 9.01083C0 13.9792 4.04067 18.0217 9.00992 18.0217C10.6911 18.0217 12.2659 17.5587 13.6134 16.7539L18.216 21.3565C20.1813 23.3191 23.1513 20.3518 21.1851 18.3865ZM2.79308 9.01083C2.79308 5.58342 5.5825 2.794 9.00992 2.794C12.4373 2.794 15.2267 5.5825 15.2267 9.01083C15.2267 12.4392 12.4373 15.2277 9.00992 15.2277C5.5825 15.2277 2.79308 12.4382 2.79308 9.01083ZM4.63558 7.39383C6.45425 3.17808 12.5776 3.66667 13.7307 8.08042C11.4079 5.35425 7.3205 5.06092 4.63558 7.39383Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1344_329">
                            <rect width="22" height="22" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                Search
            </Button> 
            <Button color="red" onClick={() => navigate('/create')}>
                <svg width="21" height="21" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 9.16667H12.8333V0H9.16667V9.16667H0V12.8333H9.16667V22H12.8333V12.8333H22V9.16667Z" fill="white"/>
                </svg>
                Add
            </Button> 
        </div>
    </div>
}
