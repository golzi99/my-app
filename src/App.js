import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {useEffect} from "react";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preLoader/preloader";

function App(props) {

    useEffect(() => {
        props.initializeApp();
    }, []);

    return (<>
            {!props.initialized ? <Preloader></Preloader> :
                <BrowserRouter>
                    <div className="App">
                        <HeaderContainer></HeaderContainer>
                        <NavBar></NavBar>
                        <div className="app-content">
                            <Routes>
                                <Route path="/ProfileInfo/:userId?" element={<ProfileContainer/>}/>
                                <Route path="/Dialogs/*" element={<DialogsContainer/>}/>
                                <Route path="/Users" element={<UsersContainer/>}/>
                                <Route path="/Login" element={<LoginContainer/>}/>
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>}
        </>
    );
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

export default connect(mapStateToProps, {initializeApp})(App);
