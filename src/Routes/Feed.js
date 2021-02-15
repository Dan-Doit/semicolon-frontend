import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

export const FEED_QUERY = gql`
  {
    seeFeed {
      hashes{
        id
        tag
      }
      state
      id
      location
      caption
      user {
        id
        isSelf
        avatar 
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        isCommented
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

// const Wrapper = styled.div`
//   display: flex;
  
  
//   min-height: 60vh;
// `;

const Story = styled.div`
    height: 100px;
    border: 1px solid black;
    margin-bottom: 20px;
    width: 600px;
`;


const Div = styled.div`
  flex-direction: column;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <Wrapper>
      {loading && <Loader />}
      
      {!loading && data && data.seeFeed && data.seeFeed.map(post => {
        if (post.state === "1") {
          return (
            <Post key={post.id}
              id={post.id}
              user={post.user}
              location={post.location}
              files={post.files}
              likeCount={post.likeCount}
              caption={post.caption}
              avatar={post.user.avatar}
              isLiked={post.isLiked}
              comments={post.comments}
              createdAt={post.createdAt}
              isSelf={post.user.isSelf}
              hashes={post.hashes}
            />)
        }
      }
    )}
    
    </Wrapper>);
};