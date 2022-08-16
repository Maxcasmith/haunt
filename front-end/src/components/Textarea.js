export function Textarea({ label, placeholder, onInput }) {
    return <div className="textarea__wrapper">
        {label && <b className="textarea__label">{label}</b>}
        <div 
            className="textarea__field"
            placeholder={placeholder || "Aa"}
            onInput={onInput}
            contentEditable 
        ></div>
    </div>
}
