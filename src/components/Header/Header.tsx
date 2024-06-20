import HeaderClass from "./Header.module.css"
import {NavLink} from "react-router-dom";
import logo from "../../assets/img/logo2.png"
import {Layout, Avatar, Col, Row} from "antd";
import React from "react";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/redux-store";
import {authLogoutUser} from "../../redux/auth-reducer.ts";
import {selectIsAuth} from "../../redux/auth-selectors.ts";
import {selectProfile} from "../../redux/profile-selectors.ts";

const {Header} = Layout;

const AppHeader: React.FC = () => {

    const isAuth = useSelector(selectIsAuth);
    const profile = useSelector(selectProfile);

    const dispatch: AppDispatch = useDispatch()

    const _authLogoutUser = () => {
        dispatch(authLogoutUser());
    }

    return (
        <Header>
            <Row className={HeaderClass.loginBlock}>
                <Col flex="auto">
                    <Avatar size={80} src={logo}/>
                </Col>
                {isAuth ?
                    <>
                        <Col flex={"50px"}>
                            <Avatar size={48}
                                    style={{backgroundColor: '#87d068'}}
                                    icon={<UserOutlined/>}
                                    src={profile?.photos.small}/>
                        </Col>
                        <Col flex={"50px"}>
                            <NavLink to={"/login"} onClick={_authLogoutUser}>Logout</NavLink>
                        </Col>
                    </> :
                    <Col flex={"100px"}>
                        <NavLink to={'/login'}>Login</NavLink>
                    </Col>
                }
            </Row>
        </Header>
    );
}

export default AppHeader;