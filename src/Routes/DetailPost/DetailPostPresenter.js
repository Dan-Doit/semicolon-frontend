import React from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import DetailPost from "../../Components/DetailPost";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

export default ({ loading, data }) => {
    if (loading === true) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if (!loading && data && data.seeFullPost) {
        const {
          seeFullPost: {
            id,
            user,
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
            selfComments    
            } 
        } = data;
        return (
            <Wrapper>
                <Helmet>
                    <title>{id} | Semicolon</title>
                </Helmet>
               
                <DetailPost key={id}
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
                
            </Wrapper>
        );
    }
    return null;
};
