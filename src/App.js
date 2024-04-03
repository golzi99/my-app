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
                <NavBar sideBar={props.appState.sideBar}></NavBar>
                <div className="app-content">
                    <Routes>
                        <Route path="/ProfileInfo"
                               element={<Profile posts={props.appState.profilePage} addPost={props.addPost}/>}/>
                        <Route path="/Dialogs/*"
                               element={<Dialogs dialogs={props.appState.dialogsPage}/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
