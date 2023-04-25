import { Textfit } from 'react-textfit';
import "./styles/display.css";

const Display = ({ value }) => {
    return (
        <Textfit className="display" mode="single" max={75}>
            {value}
        </Textfit>
    );
};

export default Display;