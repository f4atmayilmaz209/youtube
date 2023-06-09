import React,{useState} from 'react'
import styled from "styled-components"
import axios from "axios"
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import {auth,provider} from "../firebase"
import { signInWithPopup } from 'firebase/auth';

const Container = styled.div`
display:flex;
align-items:center;
flex-direction:column;
justify-content:center;
height:calc(100vh - 56px);
color:${({ theme }) => theme.text}`;

const Wrapper = styled.div`
display:flex;
align-items:center;
flex-direction:column;
width:350px;
background-color:${({ theme }) => theme.bgLighter};
border:1px solid ${({ theme }) => theme.bgLighter}
padding:20px 50px;
gap:10px;`;


const Title = styled.h1`
    font-size:24px;

`;
const SubTitle = styled.h2`
    font-size:20px;
    font-weight:300;

`;
const Input = styled.input`
    border:1px solid ${({theme})=>theme.soft};
    border-radius:3px;
    padding:10px;
    background-color:transparent;
    width:90%;

`;
const Button = styled.button`
border-radius:3px;
border:none;
padding:10px 20px;
font-weight:500;
cursor:pointer;
background-color:${({theme})=>theme.soft}

`;
const More = styled.div`
display:flex;
margin-top:10px;
font-size:10px;
color:${({theme})=>theme.textSoft}

`;
const Links=styled.div`
margin-left:50px;
`;
const Link=styled.span`
margin-left:30px;
`;


const SignIn = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()

    const handleLogin=async (e)=>{
        e.preventDefault();
        dispatch(loginStart())
        try {
            const res=await axios.post("/auth/signin",{name,password})

            dispatch(loginSuccess(res.data))
        } catch (err) {
            dispatch(loginFailure())
            
        }

    }
    const signInWithGoogle=async()=>{
        dispatch(loginStart())
        signInWithPopup(auth,provider).then((result)=>{
            axios.post("/auth/google",{
                name:result.user.displayName,
                email:result.user.email,
                img:result.user.photoURL

            }).then((res)=>{
                dispatch(loginSuccess(res.data))

            })

        }).catch((error)=>{
            dispatch(loginFailure())
        })

    }
    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to YouMa</SubTitle>
                <Input placeholder="username" onChange={e=>setName(e.target.value)}></Input>
                <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}></Input>
                <Button onClick={handleLogin}>Sign in</Button>
                <Title>or</Title>
                <Button onClick={signInWithGoogle}>Signin with Google</Button>
                <Title>or</Title>
                <Input placeholder="username" onChange={e=>setName(e.target.value)}></Input>
                <Input placeholder="email" onChange={e=>setEmail(e.target.value)}></Input>
                <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}></Input>
                <Button>Sign up</Button>
            </Wrapper>
            <More>English(USA)<Links><Link>Help</Link><Link>Privacy</Link><Link>Terms</Link></Links>
            </More>
        </Container>
    )
}

export default SignIn