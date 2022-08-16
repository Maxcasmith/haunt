import { useState, useRef, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Carousel } from "../components/Carousel";
import { ImageInputArea } from "../components/ImageInputArea";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";
import { getPosition } from "../services/Geolocation";
import { createLocation, getCoordsByAddress } from "../Api";
import {debounce} from "../utils";

export function Create() {

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [story, setStory] = useState("");
    const [mapCoords, setMapCoords] = useState({
        lat: 49.25,
        lng: -84.5
    });
    const [markerCoords, setMarkerCoords] = useState(mapCoords);

    const navigate = useNavigate();
    const addressModal = useRef(null);
    const carousel = useRef(null);
    const imagesMaxLength = 6;

    const handleImageSelect = (e) => {
        if (images.length < imagesMaxLength && e.target.files[0]) {
            setImages([...images, e.target.files[0]]);
        }
    }

    const handleOpenModal = (modal) => {
        modal.showModal();
    }

    const handleCloseModal = (modal) => {
        modal.close();
    }

    const handleUseLocation = async () => {
        try {
            const pos = await getPosition();

            const newPos = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }

            setMarkerCoords(newPos);
            setMapCoords(newPos);
        } catch (err) {
            alert(err)
        }
   }

    const handleInputAddress = debounce(async (event) => {
        try {
            const addr = event.target.innerText;
            setAddress(addr);

            if (addr.length >= 20) {
                const {latitude, longitude} = await getCoordsByAddress(addr);
                
                const newPos = {
                    lat: latitude,
                    lng: longitude
                }

                setMarkerCoords(newPos);
                setMapCoords(newPos);
            }
        } catch (err) {
            console.error(err.message);
        }
    })

    const handleUpload = async () => {
        const x = await createLocation({
            name,
            story,
            address,
            coords: markerCoords,
            images
        });
        console.log(x);
    }

    const handleDelete = async (image) => {
        const tmpImages = images.filter(i => image != i);
        setImages(tmpImages);
    }

    const mapOptions = {
        disableDefaultUI: true,
        minZoom: 2,
    }

    const moveMarker = (e) => {
        const pos = e.latLng;
        setMarkerCoords({
            lat: pos.lat(),
            lng: pos.lng()
        });
    }

    const map = useMemo(() => <GoogleMap
        mapContainerClassName="map"
        zoom={10}
        clickableIcons={false}
        options={mapOptions}
        center={mapCoords}
        onClick={moveMarker}
    >
        <Marker 
            position={markerCoords}
            draggable={true}
            onDragEnd={moveMarker}
            label={name}
        />
    </GoogleMap>, [mapCoords, markerCoords, name]);

    return <>
        <div className="create__page__wrapper">
            <div ref={carousel} className="page__carousel__wrapper">
                <Carousel 
                    images={images} 
                    handleDelete={handleDelete}
                />
                { images.length < imagesMaxLength && <div className="carousel__item"><ImageInputArea onImageSelect={handleImageSelect} /></div> }
            </div>
            <div className="page__body__wrapper">
                <div className="page__body__toolbar__wrapper">
                    <Button color="dark" onClick={() => navigate(-1)}>
                        <svg width="60" height="16" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.292896 7.29289C-0.0976257 7.68342 -0.0976257 8.31658 0.292896 8.70711L6.65686 15.0711C7.04738 15.4616 7.68055 15.4616 8.07107 15.0711C8.4616 14.6805 8.4616 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.4616 1.95262 8.4616 1.31946 8.07107 0.928932C7.68055 0.538408 7.04738 0.538408 6.65686 0.928932L0.292896 7.29289ZM60 7L1 7V9L60 9V7Z" fill="white"/>
                        </svg>
                        Back
                    </Button>
                    <Button color="dark" onClick={() => handleOpenModal(addressModal.current)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 7.469 16.812 12 24C16.531 16.812 20 11.8 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z" fill="white"/>
                        </svg>
                        Set Address
                    </Button>
                </div>
                <Input label="Name" placeholder="Text Goes Here" extraClasses="black__title" onInput={(e) => setName(e.target.value)}/>
                <div className="create__story__wrapper">
                    <Textarea label="Story" placeholder="Story Goes Here" onInput={e => setStory(e.target.innerText)} />
                </div>
                <div className="page__body__button__wrapper">
                    <Button onClick={handleUpload} color="red" >Upload</Button>
                </div>
            </div>
        </div>
        <dialog ref={addressModal} className="modal full">
            <div className="create__address__map__container">
                {map}
                <div className="map__container__button pos bottom right ">
                    <Button color="dark" onClick={handleUseLocation}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 5.625L15 0L9.38375 15L7.5 7.5L0 5.625Z" fill="white"/>
                        </svg>
                        Use My Location
                    </Button>
                </div>
            </div>
            <div className="create__address__toolbar">
                <Textarea label="Search By Address" onInput={handleInputAddress} />
                <div className="address__button__toolbar" >
                    <Button color="red" onClick={() => handleCloseModal(addressModal.current)}>Continue</Button>
                </div>
            </div>
        </dialog>
    </>
}
