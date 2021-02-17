import React from "react";
import styled from "styled-components";
import FatText from "../Components/FatText";
import { withRouter } from "react-router-dom";
import Loader from "../Components/Loader";
import SquarePost from "../Components/SquarePost";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

export const RECOMMEND_QUERY = gql`
{
  getRecommendation{
    id
    caption
    location
    files{
      url
    }
    likeCount
    commentCount
  }
}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default withRouter(() => {
    const { data, loading } = useQuery(RECOMMEND_QUERY, {fetchPolicy: "network-only"});

    if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.getRecommendation) {
    return (
      <Wrapper>
        <PostSection>
          {data.getRecommendation.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
           data.getRecommendation.map(post => (
             <SquarePost
               postid={post.id}
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
        {/* <div id="content"></div> */}
      </Wrapper>
    );
  }
});
