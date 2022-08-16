export function Input({ label, placeholder, value, password, onInput, extraClasses }) {
    return <div className="input__wrapper">
        {label && <b className="input__label">{label}</b>}
        <input 
            className={`input__field ${extraClasses}`}
            type={!password ? "text" : "password"}
            placeholder={placeholder || "Aa"}
            value={value}
            onInput={onInput}
        />
    </div>
}
