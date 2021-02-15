import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { Comment as CommentIcon } from "../Icons";
import { FaStar, FaRegStar } from "react-icons/fa";
import Theme from "../../Styles/Theme";
import Popup from 'reactjs-popup';
import DetailPost from "../DetailPost/index";
import "../../Styles/PopUp.css";
import '../../Styles/Hashtag.css';

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 25px;
  a{
    color:inherit;
  }
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
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
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Comments = styled.ul`
  margin-top:10px;
`;

const Comment = styled.li`
  margin-bottom:7px;
  span{
    margin-right:5px;
  }
`;

const Caption = styled.div`
  margin : 10px 0px
`;

const CommentCount = styled.span`
  font-weight: 400;
  opacity: 0.6;
  display: block;
  font-size: 12px;
  margin: 5px 0px;
  padding-bottom: 4px;
  cursor: pointer;
`;
const Tag = styled.div`
  margin-left:auto;
`;

export default ({
  user: { username, avatar },
  hashes,
  user,
  id,
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
  selfComments,
  isSelf
}) => (
  <Post>
    <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <Link to={`/${username}`}>
          <FatText text={username} />
        </Link>
        <Location>{location}</Location>
      </UserColumn>
	    <Tag>
          <TagsInput key={id} tags={hashes} />
        </Tag>
    </Header>
    <Files>
      {files &&
        files.map((file, index) => (
          <File key={file.id} src={file.url} showing={index === currentItem} />
        ))}
    </Files>
    <Meta>
      <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <FaStar size={26} color={Theme.starColor} /> : <FaRegStar size={26} />}
        </Button>
        <Button>

          <CommentIcon />
        </Button>
      </Buttons>
      <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
      <Caption><FatText text={username} /> {caption} </Caption>
      {PopupPost(id, user, files, likeCount, caption, avatar, isLiked, comments, createdAt, isSelf)}
      {comments && (
        <Comments>
          {selfComments.map(comment => (
            <Comment key={comment.id}>
              <Link to={`/${comment.user.username}`}>

                <FatText text={comment.user.username} />
              </Link>
              {comment.text}
            </Comment>
          ))}
        </Comments>
      )}
      <Timestamp>{createdAt}</Timestamp>
      <Textarea
        placeholder={"Add a comment..."}
        value={newComment.value}
        onChange={newComment.onChange}
        onKeyPress={onKeyUp} />
    </Meta>
  </Post>
);


const TagsInput = props => {
  const [tag] = useState(props.tags);
  return (
    <div className="tages-input">
      <ul id="tags">
        {tag.map((tag, index) => (
          <li key={index} className="tag">
            <a className='tag-title' href={`http://localhost:3000/#/search?term=${tag.tag}`}>;{tag.tag}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PopupPost = (id, user, files, likeCount, caption, avatar, isLiked, comments, createdAt, isSelf) => (
  <Popup trigger={comments.length > 0 && <CommentCount>댓글 {comments.length}개 더보기</CommentCount>} modal nested>
    {close => (
      <div className="modal">
        
        <button className="close" onClick={close}>
          &times;
        </button>

        <div className="content">
          {' '}
          <DetailPost
            close={close}
            isSelf={isSelf}
            key={id}
            id={id}
            user={user}
            files={files}
            likeCount={likeCount}
            caption={caption}
            avatar={avatar}
            isLiked={isLiked}
            comments={comments}
            createdAt={createdAt}
          />
        </div>
        <div className="actions">

        </div>
      </div>
    )}
  </Popup>
);