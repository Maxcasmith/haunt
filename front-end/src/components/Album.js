import {useState} from "react"

export function Album({id, media = []}) {
    
    const [albumMedia, setAlbumMedia] = useState(media);

    const handleClick = (m) => {
        console.log(m)
    }

    const renderMedia = media.map((m, index) => {
        return <div    
            key={`album_${id}_media_${index}`}
            className="media__box"
            onClick={() => handleClick(m)}
        >
            m
        </div>
    });

    return <div className="album__grid">
        {renderMedia}
    </div>
}
