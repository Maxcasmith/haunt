export function Button({ color, onClick, children }) {
    return <button 
        className={"haunt__button button__color__" + color} 
        onClick={onClick}
    >{children}</button>
}
