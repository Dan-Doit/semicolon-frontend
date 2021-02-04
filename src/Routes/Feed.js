import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import { Helmet } from "rl-react-helmet";

export const FEED_QUERY = gql`
  {
    seeFeed {
      state
      id
      location
      caption
      user {
        id
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
            {!loading && data && data.seeFeed && data.seeFeed.map(post => 
            {
              if (post.state === "1") {
                return <Post key={post.id}
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
            />}}
            
          
        )}
        </Wrapper>);
};