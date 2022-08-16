import './App.css';
import { Home } from "./pages/Home";
import { Router } from './Router';
import { LoadScript } from '@react-google-maps/api';
import logo from './assets/Logo.svg';
import { user } from './services/User';

function App() {
    user
        .setId(1)
        .setAdmin(true)

    return (
        <LoadScript 
            googleMapsApiKey="AIzaSyCNCoJ2H56ODBDC7iIZeaB8rRTF6vsMQno"
        >
            <div className="App">
                <img className="logo" src={logo} alt="HAUNT logo" />
                <Router/>
            </div>
        </LoadScript>
    );
}

export default App;
