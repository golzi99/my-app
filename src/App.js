import './App.css';
import NavBar from './components/NavBar/NavBar.tsx';
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer.tsx";
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
import React, {useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer.ts";
import Preloader from "./components/common/preLoader/preloader.tsx";
import store from "./redux/redux-store.ts";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer.tsx'));

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
//basename={process.env.PUBLIC_URL}
    return (<>
            {!props.initialized ? <Preloader></Preloader> :
                <HashRouter>
                    <div className="App">
                        <HeaderContainer></HeaderContainer>
                        <NavBar></NavBar>
                        <div className="app-content">
                            <React.Suspense fallback={<div><Preloader/></div>}>
                                <Routes>
                                    <Route path="/profile/:userId?" element={<ProfileContainer/>} />
                                    <Route path="/login" element={<LoginContainer/>} />
                                    <Route path="/dialogs/*" element={<DialogsContainer/>} />
                                    <Route path="/users" element={<UsersContainer pageTitle={"Samurai"}/>} />
                                    <Route path="/" element={<Navigate to="/profile" />} />
                                </Routes>
                            </React.Suspense>
                        </div>
                    </div>
                </HashRouter>}
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