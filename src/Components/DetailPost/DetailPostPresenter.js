import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import Popup from 'reactjs-popup';
import { Comment as CommentIcon } from "../Icons";
import "../../Styles/Menu.css";
import Menu from "../Menu";
import LikePresenter from "./LikePresenter";
import CommentPresenter from "./CommentPresenter";
import { FaStar, FaRegStar } from "react-icons/fa";
import Theme from "../../Styles/Theme";
import "../../Styles/PopUp.css";
import MenuPopup from "../MenuPopup";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 25px;
  a{
    color:inherit;
  }
  flexDirection: row;
  
`;

const Div1 = styled.div`
  margin-top:10px;
  overflow-y: auto;
  margin-top: -12px;
  flexDirection: row;
`;

//종훈 댓글
const Div2 = styled.div`
      flex-wrap: wrap;
    width: 70%;
    overflow: auto;
    height: 30px;
    word-break: break-all;
    overflow-y: hidden;
     margin: 0;
padding: 0;
position: relative;
display: inline-flex;
align-items: flex-start;
flex-shrink: 1;

`;
    //     flex-shrink: 0;
    // margin: 0;
    // padding: 0;
    // position: relative;
    // display: inline-flex;
    //     align-items: flex-start;
    // flex-shrink: 1;
    // min-width: 0;
    // width: fit-content;
// const Div3 


const PostComment = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 300px;
  user-select: none;
  margin-bottom: 25px;
  a{
    color:inherit;
  }
  flexDirection: row;
  
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const UserColumn = styled.div`
  margin-left: 10px;
  
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  position:absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-image: url(${props => props.src});
  background-size:cover;
  background-position: left;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Div = styled.div`
  display: flex;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
    bottom: 0;
    left: 0;
    margin: 0px 7px;
    right: 0;
    top: 0;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  padding-top:10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;



const Textarea = styled.textarea`
  border: none;
  width: 100%;
  resize: none;
  font-size: 12px;
  &:focus {
    outline: none;
      resize: none;

  }
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Comments = styled.ul`
  height:340px;
  margin-top:10px;
  overflow-y: auto;
`;
const Div3 = styled.div`
      margin-bottom: 5px;
    margin-top: 10px;
`
const Comment = styled.li`
  margin-bottom:7px;
 
  span{
    margin-right:5px;
  }
  
  resize: none;
`;

const Caption = styled.div`
  margin : 10px 0px;
  margin-bottom : 20px;   
`;

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};


export default ({
  id,
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  caption,
  currentItem,
  toggleLike,
  onKeyUp,
  comments,
  delComment,
  setSelfComments
}) => (
  <Div>
  <Post>
    
    <Files>
      {files &&
        files.map((file, index) => (
          <File key={file.id} src={file.url} showing={index === currentItem} />
        ))}
    </Files>
    </Post>
  <PostComment>
    <Meta>
          <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <Link to={`/${username}`}>
          <FatText text={username} />
          </Link>
        <Location>{location}</Location>
      </UserColumn>
        </Header>
       
        <Caption><FatText text={username} /> {caption}</Caption>

      {comments && (
        <Comments className={"commentsBox"}>
          {comments.map((comment, index) => (
            <Comment key={comment.id} index={index}>
              
              <FatText text={comment.user.username} />
              <Div2>
              {comment.text}
              </Div2>
              <Div1>
              <Button>
                <MenuPopup setSelfComments={setSelfComments} id={comment.id} comments={comments }/>
                {/* {popupMenu(comment.id, comments)} */}
              </Button>
              {/* <Button onClick={() => delComment(comment.id)}>
                삭제
              </Button> */}
              
              <LikePresenter commentId={comment.id} isCommented={comment.isCommented} />
              </Div1>         

              <Timestamp>{createdAt}</Timestamp>
              </Comment>
            ))}
          </Comments>
          
      )}
        
        <Buttons>
          <Div3>
        <Button onClick={toggleLike}>
            {isLiked ? <FaStar size={26} color={Theme.starColor } /> : <FaRegStar size={26} />}
          </Button>
          
        <Button>
          
          <CommentIcon />
            </Button>
            </Div3>
          
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
         <Timestamp>{createdAt}</Timestamp>
     
         <Textarea
        placeholder={"Add a comment..."}
        value={newComment.value}
        onChange={newComment.onChange}
          onKeyPress={onKeyUp} />
      </Meta>
    </PostComment>
    </Div>
);


// const popupMenu = (commentId, comments) => (
    
//     <Popup
    
//     modal
//     overlayStyle={{ background: "rgba(0,0,0,0.7" }}
//     contentStyle={contentStyle}
//     closeOnDocumentClick={false}
//     trigger={(open) => <Div1 className={"Box"}><IoEllipsisHorizontalSharp size={16} open={open} /></Div1>}
//     >


//       {(close) => <Menu close={close} commentId={commentId} comments={comments} />}
//     </Popup>
  
// );
