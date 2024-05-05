const ControlledInput = ({ name, value, onChange, unit, label }) => {
    return (
        <div className="controlador">
            <label>{label}</label>
            <input
                type="range"
                name={name}
                value={value}
                onChange={onChange}
                min="0.1"
                max="10"
                step="0.1"
                className="mb-2"
            />
            <input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                min="0.1"
                max="10"
                step="0.1"
                className="ml-2"
            />
            <p>Value: {value} {unit}</p>
        </div>
    )
}

export default ControlledInput