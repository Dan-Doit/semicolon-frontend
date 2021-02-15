import React, { useState } from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { Comment as CommentIcon } from "../Icons";
import "../../Styles/Menu.css";
import LikePresenter from "./LikePresenter";
import { FaStar, FaRegStar } from "react-icons/fa";
import Theme from "../../Styles/Theme";
import "../../Styles/PopUp.css";
import MenuPopup from "../MenuPopup";
import Loader from "../Loader";
import EditPopup from "../EditPopup";

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
    width: 65%;
    overflow: auto;

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
  margin-bottom : 10px;   
`;

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};
const MoreButton = styled.span`
  cursor: pointer;
  margin-left: auto;
  font-size: 20px;
`;


export default ({
  id,
  isSelf,
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
  setSelfComments,
  close
}) => {
  const [Copycaption, setCopycaption] = useState(caption);
  const [deletePost, setDeletePost] = useState(true)
  const [isLoader, setIsLoader] = useState(true)
  if (!deletePost) {
    close()
  }
  return (
    <Div>
      {isLoader ? null : <Loader />}
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
              
              </Link>
              <Location>{location}</Location>
              <Caption><FatText text={username} /> {Copycaption}</Caption>
            </UserColumn>

            <MoreButton >
              {isSelf ? <EditPopup id={id} setIsLoader={setIsLoader} setDeletePost={setDeletePost} setCopycaption={setCopycaption} Copycaption={Copycaption} /> : null}
            </MoreButton>
          </Header>

          

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
                      <MenuPopup setSelfComments={setSelfComments} id={comment.id} comments={comments} />
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
                {isLiked ? <FaStar size={26} color={Theme.starColor} /> : <FaRegStar size={26} />}
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
  )
};


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
