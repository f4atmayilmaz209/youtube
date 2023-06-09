import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {ThumbUpOutlined} from "@material-ui/icons"
import {ThumbDownAltRounded} from "@material-ui/icons"
import {AddCommentRounded} from "@material-ui/icons"
import {ReplyOutlined} from "@material-ui/icons"
import Comments from '../components/Comments'
import Card from "../components/Card"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from "axios"
import { fetchSuccess } from '../redux/videoSlice'
import {format} from "timeago.js"
import { like } from '../redux/videoSlice'
import { dislike } from '../redux/videoSlice'
import { current } from '@reduxjs/toolkit'
import { subscription } from '../redux/userSlice'

const Container=styled.div`
  display:flex;
  gap:24px;
`;
const Content=styled.div`
  flex:5;
`;
const VideoWrapper=styled.div`
  flex:5;
`;
const Title=styled.h1`
  font-size:18px;
  font-weight:400;
  margin-top:20px;
  margin-bottom:10px;
  color:${({theme})=>theme.text}

`;

const Details=styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;

  `;
const Info=styled.span`
  color:${({theme})=>theme.textSoft}`;


const Buttons=styled.div`
  display:flex;
  gap:20px;
  color:${({theme})=>theme.text}`;
const Button=styled.div`
  display:flex;
  align-items:center;
  gap:5px;
  cursor:pointer;`;

const Hr=styled.hr`
  margin:15px 0px;
  border:0.5px solid ${({theme})=>theme.soft};`;


const Recommendation=styled.div`
  flex:2;
`;

const Channel=styled.div`
  display:flex;
  justify-content:space-between;

`;
const ChannelInfo=styled.div`
  display:flex;
  gap:20px;`;
const Image=styled.img`
  width:50px;
  height:50px;
  border-radius:50%;`;
const ChannelDetail=styled.div`
  display:flex;
  flex-direction:column;
  color:${({theme})=>theme.text}`;
const ChannelName=styled.span`
  font-weight:500;`;
const ChannelCounter=styled.span`
  margin-top:5px;
  margin-bottom:20px;
  color:${({theme})=>theme.textSoft}
  font-size:12px;`;

const Description=styled.p`
font-size:14px;`;
const Subscribe=styled.button`
  background-color:#cc1a00;
  font-weight:500;
  color:white;
  border:none;
  border-radius:3px;
  height:max-content;
  padding:10px 20px;
  cursor:pointer;
`;

const VideoFrame=styled.video`
max-height:720px;
width:100%;
object-fit:cover;
`;


const Video = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const {currentVideo}=useSelector((state)=>state.video)
  const dispatch=useDispatch()

  const path=useLocation().pathname.split("/")[2]
  const [channel,setChannel]=useState({})


  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const videoRes=await axios.get(`/videos/find/${path}`)
        console.log(videoRes)
        const channelRes=await axios.get(`/users/find/${videoRes?.data?.userId}`)
        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data))
      } catch (error) {
        
      }

    }
    fetchData()
  },[path,dispatch])

  const handleLike=async()=>{
    await axios.put(`/users/like/${currentVideo?._id}`)
    dispatch(like(currentUser?._id))

  }
  const handleDislike=async()=>{
    await axios.put(`/users/dislike/${currentVideo?._id}`)
    dispatch(dislike(currentUser?._id))

  }
  const handleSub=async()=>{
    currentUser.subscribedUsers.includes(channel?._id)
      ?  await axios.put(`/users/unsub/${channel?._id}`)
      :  await axios.put(`/users/sub/${channel?._id}`)
    dispatch(subscription(channel?._id))

  }


  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls></VideoFrame>

        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views - {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>{currentVideo?.likes?.includes(currentUser?._id) ? (<ThumbUpOutlined></ThumbUpOutlined>) : (<ThumbUpOutlined></ThumbUpOutlined>)}{" "} {currentVideo?.likes?.length}</Button>
            <Button onClick={handleDislike}>{currentVideo?.dislikes?.includes(currentUser?._id) ? (<ThumbDownAltRounded></ThumbDownAltRounded>):(<ThumbDownAltRounded></ThumbDownAltRounded>)}{" "} Dislike</Button>
            <Button onClick={handleLike}><ReplyOutlined>Share</ReplyOutlined></Button>
            <Button><AddCommentRounded>Save</AddCommentRounded></Button>
          </Buttons>

        </Details>
        <Hr></Hr>
        <Channel>
          <ChannelInfo>
            <Image src={channel.img}></Image>
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>  
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>  
              <Description>{currentVideo?.desc}</Description>  
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>{currentUser.subscribedUsers?.includes(channel?._id) ? "SUBSCRIBED" :"SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr></Hr>
        <Comments videoId={currentVideo?._id}></Comments>
      </Content>
      <Recommendation tags={currentVideo?.tags}>
      </Recommendation>
    </Container>
  )
}

export default Video