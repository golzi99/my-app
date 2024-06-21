import './App.css';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import {UsersPage} from "./components/Users/UsersContainer.tsx";
import React, {useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer.ts";
import Preloader from "./components/common/preLoader/preloader.tsx";
import store, {AppStateType} from "./redux/redux-store.ts";
import {LoginPage} from "./components/Login/LoginPage.tsx";
import {Layout, Menu, Breadcrumb, theme} from "antd";
import type {MenuProps} from "antd";
import AppHeader from "./components/Header/Header.tsx";

const {Content, Sider, Footer} = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage.tsx'));

const App: React.FC<Props> = (props) => {

    const items1: MenuProps['items'] = ['Profile', 'Dialogs', 'Users', 'Chat'].map((key) => ({
        key,
        label: <Link to={`${key.toLowerCase()}`}>{key}</Link>,
    }));

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    useEffect(() => {
        props.initializeApp();
    });

    return (<>
            {!props.initialized ? <Preloader></Preloader> :
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <AppHeader></AppHeader>
                    <Layout>
                        <Content style={{padding: '0 48px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Layout
                                style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG}}
                            >
                                <Sider style={{background: colorBgContainer}} width={200}>
                                    <Menu
                                        mode="inline"
                                        defaultSelectedKeys={['Profile']}
                                        style={{height: '100%'}}
                                        items={items1}
                                    />
                                </Sider>
                                <Content style={{padding: '0 24px', minHeight: 280}}>
                                    <React.Suspense fallback={<div><Preloader/></div>}>
                                        <Routes>
                                            <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                                            <Route path="/login" element={<LoginPage/>}/>
                                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                                            <Route path="/users" element={<UsersPage pageTitle={"Samurai"}/>}/>
                                            <Route path="/" element={<Navigate to="/profile"/>}/>
                                            <Route path="/chat" element={<ChatPage/>}/>
                                        </Routes>
                                    </React.Suspense>
                                </Content>
                            </Layout>
                        </Content>
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        Samurai Design ©{new Date().getFullYear()} Created by Samurai
                    </Footer>
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