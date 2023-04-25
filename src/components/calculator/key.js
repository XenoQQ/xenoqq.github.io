import "./styles/key.css";

const Key = ({ className, value, onClick }) => {
    return (
        <button className={className} onClick={onClick}>{value}</button>
    );
};

export default Key;