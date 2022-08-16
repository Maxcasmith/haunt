import { Button } from "../components/Button";
import logo from "../assets/Logo.svg";
import { scenes } from "../scenes";
import { useNavigate } from 'react-router-dom';

const scene = scenes[Math.floor(Math.random() * scenes.length)];

export function Home() {

    const navigate = useNavigate();

    return <div className="home__wrapper">
        {scene}
        <div className="home__overlay">
            <img src={logo} alt="HAUNT logo" />
            <p>For the fearless urban explorer</p>
            <Button color="red" onClick={() => navigate('/map')}>Continue</Button>
        </div>
        <div className="pos left bottom home__download__wrapper">
            <Button color="none">Download the app here</Button>
        </div>
    </div>
}
