export function Selectable({ title, imageSrc, onClick }) {
    return <div className="selectable__wrapper" onClick={onClick}>
        <div className="selectable__image">
            <img src={imageSrc} alt={title}/>
        </div>
        <b className="selectable__title">{title}</b>
    </div>
}
