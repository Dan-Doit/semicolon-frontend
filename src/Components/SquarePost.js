import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFull, CommentFull } from "./Icons";
import { Link } from "react-router-dom";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s linear;
  svg {
    fill: white;
  }
`;

const Container = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;



const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const SquarePost = ({ postid, likeCount, commentCount, file }) => (
  <Container bg={file.url}>
   <Link to={`/post/${postid}`}>
        <Overlay>
          <Number>
            <HeartFull />
            <NumberText>{likeCount}</NumberText>
          </Number>
      
          <Number>
            <CommentFull />
            <NumberText>{commentCount}</NumberText>
          </Number>
      </Overlay>
      </Link>
  </Container>
);

SquarePost.propTypes = {
    postid:PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    file: PropTypes.shape({
            url: PropTypes.string.isRequired
        }).isRequired
};

export default SquarePost;