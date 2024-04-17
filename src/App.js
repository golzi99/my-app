import './App.css';
import {Header} from './components/Header/Header.jsx';
import {NavBar} from './components/NavBar/NavBar.jsx';
import {Profile} from './components/Profile/Profile.jsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

function App(props) {
    return (
        <BrowserRouter>
            <div className="App">
                <Header></Header>
                <NavBar></NavBar>
                <div className="app-content">
                    <Routes>
                        <Route path="/ProfileInfo" element={<Profile/>}/>
                        <Route path="/Dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/Users" element={<UsersContainer/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
