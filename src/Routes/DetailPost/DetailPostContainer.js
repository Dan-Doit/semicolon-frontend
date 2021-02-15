import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import DetailPostPresenter from "./DetailPostPresenter";


const SEE_FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      location
      caption
      user {
        id
        avatar 
        username
        isSelf
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
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

export default withRouter(({ match: { params: { id } } }) => {
  const { data, loading } = useQuery(SEE_FULL_POST, { variables: { id } });
    return <DetailPostPresenter loading={loading} data={data} />;
});