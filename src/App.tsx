import './App.css';
import NavBar from './components/NavBar/NavBar.tsx';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {UsersPage} from "./components/Users/UsersContainer.tsx";
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
import React, {useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer.ts";
import Preloader from "./components/common/preLoader/preloader.tsx";
import store, {AppStateType} from "./redux/redux-store.ts";
import {LoginPage} from "./components/Login/LoginPage.tsx";


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'));

const App: React.FC<Props> = (props) => {

    // const catchAllUnhandledErrors = (promiseRejectionEvent : PromiseRejectionEvent, promise) => {
    //     alert("Some error occurred");
    //     // console.error(promiseRejectionEvent);
    //     return promiseRejectionEvent;
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
                                    <Route path="/login" element={<LoginPage/>} />
                                    <Route path="/dialogs/*" element={<DialogsContainer/>} />
                                    <Route path="/users" element={<UsersPage pageTitle={"Samurai"}/>} />
                                    <Route path="/" element={<Navigate to="/profile" />} />
                                </Routes>
                            </React.Suspense>
                        </div>
                    </div>
                </BrowserRouter>}
        </>
    );
}

let mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

let AppContainer = connect(mapStateToProps, {initializeApp})(App);

const SamuraiJSApp: React.FC = () => {
    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>);
}

export default SamuraiJSApp;

type Props = ReturnType<typeof mapStateToProps> & MapDispatchPropsType;

type MapDispatchPropsType = {
    initializeApp: () => void;
}