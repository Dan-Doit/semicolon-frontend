
// import React from "react";
// import ReactDOM from "react-dom";

export default () => "디테일임^^";

// class Popup extends React.Component {
//   render() {
//     return (
//       <div className='popup'>
//         <div className='popup_inner'>
//           <h1>{this.props.text}</h1>
//         <button onClick={this.props.closePopup}>close me</button>
//         </div>
//       </div>
//     );
//   }
// }
// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       showPopup: false
//     };
//   }
//   togglePopup() {
//     this.setState({
//       showPopup: !this.state.showPopup
//     });
//   }
//   render() {
//     return (
//       <div className='app'>
//         <h1>hihi</h1>
//         <button onClick={this.togglePopup.bind(this)}>show popup</button>
//         <button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button>
//         <p>Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br /></p>
//         {this.state.showPopup ? 
//           <Popup
//             text='Close Me'
//             closePopup={this.togglePopup.bind(this)}
//           />
//           : null
//         }
//       </div>
//     );
//   }
// };



// ReactDOM.render(
//   <App />,
//   document.getElementById('content')
// );


// import React from "react";
// import styled from "styled-components";
// import { gql } from "apollo-boost";
// import { useQuery } from "react-apollo-hooks";
// import Loader from "../Components/Loader";
// import Post from "../Components/Post";
// import withRouter from "react-router-dom/withRouter";
// import TextareaAutosize from "react-autosize-textarea";
// import Avatar from "../Components/Avatar";
// import FatText from "../Components/FatText";
// import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Components/Icons";
// import { Link } from "react-router-dom";
// import useInput from "../Hooks/useInput"

// const Caption = styled.div`
//   margin : 10px 0px
// `;

// const PostD = styled.div`
//   ${props => props.theme.whiteBox};
//   width: 100%;
//   max-width: 600px;
//   user-select: none;
//   margin-bottom: 25px;
//   a{
//     color:inherit;
//   }
// `;

// const Header = styled.header`
//   padding: 15px;
//   display: flex;
//   align-items: center;
// `;

// const UserColumn = styled.div`
//   margin-left: 10px;
// `;

// const Location = styled.span`
//   display: block;
//   margin-top: 5px;
//   font-size: 12px;
// `;

// const Files = styled.div`
//   position: relative;
//   padding-bottom: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: stretch;
//   flex-shrink: 0;
// `;

// const File = styled.div`
//   max-width: 100%;
//   width: 100%;
//   height: 600px;
//   position: absolute;
//   top: 0;
//   background-image: url(${props => props.src});
//   background-size: cover;
//   background-position: center;
//   opacity: ${props => (props.showing ? 1 : 0)};
//   transition: opacity 0.5s linear;
// `;

// const Button = styled.span`
//   cursor: pointer;
// `;

// const Meta = styled.div`
//   padding: 15px;
// `;

// const Buttons = styled.div`
//   ${Button} {
//     &:first-child {
//       margin-right: 10px;
//     }
//   }
//   margin-bottom: 10px;
// `;

// const Timestamp = styled.span`
//   font-weight: 400;
//   text-transform: uppercase;
//   opacity: 0.5;
//   display: block;
//   font-size: 12px;
//   margin: 10px 0px;
//   padding-bottom: 10px;
//   border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
// `;

// const Textarea = styled(TextareaAutosize)`
//   border: none;
//   width: 100%;
//   resize: none;
//   font-size: 14px;
//   &:focus {
//     outline: none;
//   }
//   font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
// `;

// const Comments = styled.ul`
//   margin-top:10px;
// `;

// const Comment = styled.li`
//   margin-bottom:7px;
//   span{
//     margin-right:5px;
//   }
// `;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   min-height: 60vh;
// `;

// const DETAIL_QUERY = gql`
//   query seeFullPost($id: String!) {
//      seeFullPost(id: $id) {
//       id
//       location
//       caption
//       user {
//         id
//         avatar 
//         username
//       }
//       files {
//         id
//         url
//       }
//       likeCount
//       isLiked
//       comments {
//         id
//         text
//         user {
//           id
//           username
//         }
//       }
//       createdAt
//     }
//   }
 
// `;

// export default withRouter(({ match: { params: { postid } } }) => {
//     const { data, loading } = useQuery(DETAIL_QUERY, { variables: { id:postid } });
//     if (loading) {
//         return (
//             <Wrapper>
//                 <Loader />
//             </Wrapper>
//         );
//     } else {
//         console.log(data);
//         const {
//             seeFullPost: {
//                 user,
//                 location,
//                 files,
//                 isLiked,
//                 likeCount,
//                 createdAt,
//                 newComment,
//                 caption,
//                 currentItem,
//                 toggleLike,
//                 onKeyUp,
//                 comments
//             }
//         } = data;
//         return (
//             <PostD>
//                 <Header>
//                     <Avatar size="sm" url={user.avatar} />
//                     <UserColumn>
//                         <Link to={`/${user.username}`}>
//                             <FatText text={user.username} />
//                         </Link>
//                         <Location>{location}</Location>
//                     </UserColumn>
//                     </Header>
//                 <Files>
//                     {files &&
//                         files.map((file, index) => (
//                             <File key={file.id} src={file.url} showing={index === currentItem} />
//                         ))}
//                 </Files>
//                 {/* <Caption>{caption}</Caption>  */}
//                 <Meta>
//                     <Buttons>
//                         <Button onClick={toggleLike}>
//                             {isLiked ? <HeartFull /> : <HeartEmpty />}
//                         </Button>
//                         <Button>
//                             -
//            <CommentIcon />
//                         </Button>
//                     </Buttons>
//                     <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
//                     <Caption><FatText text={user.username} />{caption}</Caption>
//                     {comments && (
//                         <Comments>
//                                                         {comments.map(comment => (
//                                 <Comment key={comment.id}>
//                                     <FatText text={comment.user.username} />
//                                     {comment.text}
//                                 </Comment>
//                             ))}
//                         </Comments>
//                     )}
//                     <Timestamp>{createdAt}</Timestamp>
//                     <Textarea
//                         placeholder={"Add a comment..."}
//                         value={newComment.value}
//                         onChange={newComment.onChange}
//                         onKeyPress={onKeyUp} />
//                 </Meta>
//             </PostD>
//         )
//     }
// }
// );