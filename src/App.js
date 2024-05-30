import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer.ts";
import Preloader from "./components/common/preLoader/preloader";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.jsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.jsx'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer.jsx'));

function App(props) {

    // const catchAllUnhandledErrors = (promiseRejectionEvent, promise) => {
    //     alert("Some error occurred");
    //     // console.error(promiseRejectionEvent);
    // };

    useEffect(() => {
        props.initializeApp();
        // window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
        // return () => {
        //     //will unmount
        //     window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
        // };
    },);

    return (<>
            {!props.initialized ? <Preloader></Preloader> :
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <div className="App">
                        <HeaderContainer></HeaderContainer>
                        <NavBar></NavBar>
                        <div className="app-content">
                            <React.Suspense fallback={<div><Preloader/></div>}>
                                <Routes>
                                    <Route path="/profile/:userId?" element={<ProfileContainer/>} />
                                    <Route path="/login" element={<LoginContainer/>} />
                                    <Route path="/dialogs/*" element={<DialogsContainer/>} />
                                    <Route path="/users" element={<UsersContainer/>} />
                                    <Route path="/" element={<Navigate to="/profile" />} />
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