import './App.css';
import {Header} from './components/Header/Header.jsx';
import {NavBar} from './components/NavBar/NavBar.jsx';
import {Profile} from './components/Profile/Profile.jsx';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <NavBar></NavBar>
            <Profile></Profile>
        </div>
    );
}

export default App;
