import React, {useRef, useState, useEffect} from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, User, Logo } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME, GET_TODAYINFO, GET_NOTIFICATION } from "../SharedQueries";
import EnventInfoContainer from "../Components/EventInfo";
import Popup from 'reactjs-popup';
//import { Card, EAvatar } from './UserCard';
import {
  UserInfo,
  UserInfoText1,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
} from "../Styles/Notification";
import Avatar from "../Components/Avatar";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  z-index: 2;
`;


const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const ROWD = styled.div`
  flex-direction:row;
  display: flex;
 
`;

export default withRouter(({ history }) => {
  const search = useInput("");
  const { data } = useQuery(ME);
  const { data : ndata } = useQuery(GET_NOTIFICATION);
   console.log(ndata);

  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  
 const { data:todayData } = useQuery(GET_TODAYINFO, {
      variables: {
          location: "incheon",
          latitude: 37.4111,
          longitude: 126.7111
        }
 });
  

  
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/" style={{marginRight:30}}>
            <Logo />
          </Link>
            {todayData && <EnventInfoContainer location={todayData.todayInfo.countryName} data={todayData.todayInfo.newCase} temp={todayData.todayInfo.temp} weather={todayData.todayInfo.weather} />}
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
         
            {/* <Ionicons name="notifications-outline" size={24} color="black" /> */}
          {NotificationPopup(ndata)}
         
        
          {!data ? (<HeaderLink to="/#">
              <User />
            </HeaderLink>) : 
            (<HeaderLink to={data.me.username}>
              <User />
            </HeaderLink>)
          }
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});

const NotificationPopup = (ndata) => {
  const ref = useRef();
  return (
    
      <Popup
        className={"npopup"}
        ref={ref}
        trigger={
          <HeaderLink><HeartEmpty /></HeaderLink> 
        }
      >
        <div width="30%">
        <UserNotification ndata = {ndata} />
        </div>
      </Popup>
   
  );
};

const caculateTime = (time) => { 
    if (time !== undefined) {
        const date = new Date();
        const getTime = `${time}`.split('T');
        const days = getTime[0].split('-');
        const times = getTime[1].substring(0, 8).split(':');
        if (date.getFullYear() == days[0]) {
            if (date.getMonth() + 1 == days[1]) {
                if (date.getDate() == days[2]) {
                    // plus 10 because UK has different time with KR
                    if (date.getHours() == parseInt(times[0])+9) {
                        if (date.getMinutes() == times[1]) { 
                                // cv
                             return `${parseInt(date.getSeconds()) - parseInt(times[2])} 초전`
                        }else return `${parseInt(date.getMinutes()) - parseInt(times[1])} 분전`
                    }else return `${parseInt(date.getHours()) - (parseInt(times[0])+9)} 시간전`
                } else return `${parseInt(date.getDate()) - parseInt(days[2])} 일전`;
            } else return `${parseInt(date.getMonth()+1) - parseInt(days[1])} 달전`;
        } else return `${parseInt(date.getFullYear()) - parseInt(days[0])} 년전`;

    }
    return null;
}

const messageHandler = (id,following) => { 
    const arr = following.map((f) => f.id);
    return(arr.includes(id));
}


const UserNotification = ({ ndata }) => {
    const [data, setData] = useState([]);
    console.log(ndata);
  useEffect(() => { 
    
        const Notis = ndata.getNotificate.map((noti,index) => {
            if (noti.message === null && noti.from !== null && noti.post !== null) {
            return {
                id: `${noti.from.id}${index}`,
                userName: noti.from.username,
                userImg: noti.from.avatar,
                messageTime: caculateTime(noti.createdAt),
                messageText: `${noti.from.username}님이 나에게 좋아요를 눌렀습니다.`,
                post: null,
                message: null,
                state: "Detail",
                roomInfo: {id: noti.post.id}
            }
            
            } else if (noti.post === null && noti.from !== null && noti.message !== null) {
                let into = "";
                let information = {};
                let text = "";
                if (!messageHandler(noti.from.id, ndata.getFollowing)) {
                    // 프로필로 가기
                    into = "UserDetail";
                    information = { username: noti.from.username }
                    text = `${noti.from.username}님이 대화를 원하고있어요!`;
                } else { 
                    // 메세지로 가기
                    into = "MessageContainer"
                    information = {
                        roomInfo: {
                        roomId: noti.message.id,
                        toId: noti.from.id,
                        userName: noti.from.username,
                        Im: noti.to.id,
                        myName: noti.to.username
                    }
                    }
                    text = `${noti.from.username}님이 나에게 메세지를 보냈습니다.`;
                }

            return {
                id: `${noti.from.id}${index}`,
                userName: noti.from.username,
                userImg: noti.from.avatar,
                messageTime: caculateTime(noti.createdAt),
                messageText: text,
                post: null,
                message: null,
                state:into,
                roomInfo:information
            }
        } else if (noti.post === null && noti.message === null) {
            return {
                id: `${noti.from.id}${index}`,
                userName: noti.from.username,
                userImg: noti.from.avatar,
                messageTime: caculateTime(noti.createdAt),
                messageText: `${noti.from.username}님이 나를 팔로우 하였습니다.`,
                post: null,
                message: null,
                state: "UserDetail",
                roomInfo: {username: noti.from.username}
            }
        }
        });
        setData(Notis)
        return () => {setData([])}
    },[ndata])
    
    


  return (<>
        {data.map(item => (
              
          <UserInfo>
           
                   
            <ROWD>
               <Avatar url={item.userImg }/>
                    <UserInfoText1>
           
                      <UserInfoText>
                       
                        <UserName>{item.userName}</UserName>
                        <PostTime>{item.messageTime}</PostTime>
                        </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
                 </UserInfoText1>
                            </ROWD>
              
 
                        </UserInfo>
                
              ))}         
                   
  </>) 
};