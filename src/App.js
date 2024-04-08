import './App.css';
import {Header} from './components/Header/Header.jsx';
import {NavBar} from './components/NavBar/NavBar.jsx';
import {Profile} from './components/Profile/Profile.jsx';
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App(props) {
    return (
        <BrowserRouter>
            <div className="App">
                <Header></Header>
                <NavBar sideBar={props.state.sideBar} avatars={props.state.avatars}></NavBar>
                <div className="app-content">
                    <Routes>
                        <Route path="/ProfileInfo"
                               element={<Profile profilePage={props.state.profilePage}
                                                 dispatch={props.dispatch}
                                                 avatars={props.state.avatars}/>}/>
                        <Route path="/Dialogs/*"
                               element={<Dialogs dialogsPage={props.state.dialogsPage}
                                                 dispatch={props.dispatch}
                                                 avatars={props.state.avatars}/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
