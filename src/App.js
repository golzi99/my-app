import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preLoader/preloader";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.jsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.jsx'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'));

function App(props) {

    useEffect(() => {
        props.initializeApp();
    },);

    return (<>
            {!props.initialized ? <Preloader></Preloader> :
                <BrowserRouter>
                    <div className="App">
                        <HeaderContainer></HeaderContainer>
                        <NavBar></NavBar>
                        <div className="app-content">
                            <React.Suspense fallback={<div><Preloader/></div>}>
                                <Routes>
                                    <Route path="/ProfileInfo/:userId?" element={<ProfileContainer/>} />
                                    <Route path="/Login" element={<LoginContainer/>} />
                                    <Route exact path="//Dialogs/*" element={<DialogsContainer/>} />
                                    <Route path="/Users" element={<UsersContainer/>} />
                                </Routes>
                            </React.Suspense>
                        </div>
                    </div>
                </BrowserRouter>}
        </>
    );
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

let AppContainer = connect(mapStateToProps, {initializeApp})(App);

const SamuraiJSApp = () => {
    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>);
}

export default SamuraiJSApp;