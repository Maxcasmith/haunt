import { Button } from "./Button"

export function Carousel({ images, handleDelete }) {

    const render = images.map((image, index) => {
        let renderImage = image.url; 
        if (handleDelete && !image.url) renderImage = URL.createObjectURL(image);

        return <div key={`image_${index}`} className="carousel__image carousel__item">
            <img src={renderImage} />
            {handleDelete && <div className="carousel__item__delete">
                <Button color="fade" onClick={() => handleDelete(image)}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.8334 20H4.16669C3.24669 20 2.50002 19.2533 2.50002 18.3333V5H17.5V18.3333C17.5 19.2533 16.7534 20 15.8334 20ZM10 11.3217L12.7442 8.5775L13.9225 9.75583L11.1784 12.5L13.9225 15.2442L12.7442 16.4225L10 13.6783L7.25585 16.4225L6.07752 15.2442L8.82169 12.5L6.07752 9.75583L7.25585 8.5775L10 11.3217V11.3217ZM18.3334 4.16667H1.66669V2.5H6.66669V1.25C6.66669 0.560833 7.22752 0 7.91669 0H12.0834C12.7709 0 13.3334 0.559167 13.3334 1.25V2.5H18.3334V4.16667ZM11.6667 1.66667H8.33335V2.5H11.6667V1.66667Z" fill="white"/>
                    </svg>
                </Button>
            </div>}
        </div>
    });

    return <div className="carousel__wrapper">
        {render}
    </div>
}
