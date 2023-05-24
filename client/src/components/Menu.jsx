import React from 'react'
import styled from "styled-components"
import YouMa from "../img/logo.png"
import { Home } from "@material-ui/icons"
import {ExploreOutlined} from "@material-ui/icons"
import {SubscriptionsOutlined} from "@material-ui/icons"
import {VideoLibraryOutlined} from "@material-ui/icons"
import {HistoryOutlined} from "@material-ui/icons"
import {LibraryMusicOutlined} from "@material-ui/icons"
import {SportsEsportsOutlined} from "@material-ui/icons"
import {SportsBasketballOutlined} from "@material-ui/icons"
import {MovieOutlined} from "@material-ui/icons"
import {ChangeHistory} from "@material-ui/icons"
import {LiveTvOutlined} from "@material-ui/icons"
import {AccountCircleOutlined} from "@material-ui/icons"
import {SettingsOutlined} from "@material-ui/icons"
import {FlagOutlined} from "@material-ui/icons"
import {HelpOutlineOutlined} from "@material-ui/icons"
import {SettingsBrightnessOutlined} from "@material-ui/icons"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
const Container = styled.div`
    flex:1;
    background-color:${({theme})=>theme.bg};
    height:100vh;
    color:${({theme})=>theme.text};;
    font-size:14px;
    position:sticky;
    top:0;

`

const Wrapper = styled.div`
    padding:18px 26px;


`
const Logo = styled.div`
    display:flex;
    align-items:center;
    gap:5px;
    font-weight:bold;
    margin-bottom:25px;


`
const Img = styled.img`
    height:25px;
`
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({theme})=>theme.soft};
`;


const Item = styled.div`
    display:flex;
    align-items:center;
    gap:0px;
    cursor:pointer;
    padding:1px 0px;
    &:hover{
        background-color:${({theme})=>theme.soft}

    }
`
const Login = styled.div``;
const Button = styled.button`

    padding:5px 15px;
    background-color:transparent;
    border:1px solid #3ea6ff;
    color:#3ea6ff;
    border-radius:3px;
    font-weight:500;
    margin-top:10px;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:5px;


`;
const Title=styled.h2`
    font-size:14px;
    font-weight:500;
    color:#aaaaaa;
    margin-bottom:20px;
`

const Menu = ({darkMode,setDarkMode}) => {

    const currentUser =useSelector((state)=>state.user.currentUser)
    console.log("menucurrentuser")
    console.log(currentUser)
    console.log("menucurrentuser")
    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{textDecoration:"none"}}>
                    <Logo>
                        <Img src={YouMa}></Img>
                        YOUMA
                    </Logo>
                </Link>
                <Item>
                    <Home></Home>
                    Home
                </Item>
                <Link to="trends" style={{textDecoration:"none",color:"inherit"}}>
                    <Item>
                        <ExploreOutlined />
                        Explore
                    </Item>
                </Link>
                <Link to="subscriptions" style={{textDecoration:"none",color:"inherit"}}>
                    <Item>
                        <SubscriptionsOutlined />
                        Subscriptions
                    </Item>
                </Link>

                <Hr />
                <Item>
                    <VideoLibraryOutlined />
                    Library
                </Item>
                <Item>
                    <HistoryOutlined />
                    History
                </Item>
                <Hr />
                {!currentUser &&
                    <>
                    <Login>                   
                        Sign in to like videos,comment,and subscribe.
                        <Link to="signin" style={{textDecoration:"none"}}>
                            <Button><AccountCircleOutlined></AccountCircleOutlined>SIGN IN</Button>
                        </Link>
                        
                                
                    </Login>
                    <Hr /></>

                }

                <Title>BEST OF LAMATUBE</Title>
                <Item>
                    <LibraryMusicOutlined />
                    Music
                </Item>
                <Item>
                    <SportsBasketballOutlined />
                    Sports
                </Item>
                <Item>
                    <SportsEsportsOutlined />
                    Gaming
                </Item>
                <Item>
                    <MovieOutlined />
                    Movies
                </Item>
                <Item>
                    <ChangeHistory />
                    News
                </Item>
                <Item>
                    <LiveTvOutlined />
                    Live
                </Item>
                <Hr />
                <Item>
                    <SettingsOutlined />
                    Settings
                </Item>
                <Item>
                    <FlagOutlined />
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlined/>
                    Help
                </Item>
                <Item onClick={()=>setDarkMode(!darkMode)}>
                    <SettingsBrightnessOutlined/>
                    {darkMode ? "Light" : "Dark"} Mode
                    
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu