import React, { useState } from "react";
import Popup from 'reactjs-popup';
import styled from "styled-components";
import { useMutation } from "react-apollo-hooks";
import { DELETE_COMMENT } from "./DetailPost/DetailPostQueries";
import { FEED_QUERY } from "../Routes/Feed";


const Div = styled.div`
animation: IGCoreModalShow .1s ease-out;
  background-color: rgba(var(--f23,255,255,255),1);
  border-radius: 12px;
  border:none;
  width:400px;
  margin: auto;
`
const Span = styled.span`
  width: 100%;
  border: 0;  
  color : black;
  text-align: center;
  cursor:pointer;
  display:block;
  height: 48px;
  border:none;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  border-top: 1px solid rgba(var(--b6a,219,219,219),1); 
  line-height: 3.4;
`
const SpanS = styled.span`
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  border-top: 1px solid rgba(var(--b6a,219,219,219),1);
  color: rgba(var(--i30,237,73,86),1);
  width: 100%; 
  border: 0;  
  text-align: center;
  cursor:pointer;
  display:block;
  height: 48px;
  border:none;
  line-height: 3.4;
`



// const Button = styled.button`
//   width: 100%;
//   border: 0;
//   border-radius: ${props => props.theme.borderRadius};
//   color: white;
//   font-weight: 600;
//   background-color: ${props => props.theme.navyColor};
//   text-align: center;
//   padding: 7px 0px;
//   font-size: 16px;
  
//   cursor:pointer;
//   display: inline;
//   margin: auto;
//   width: 10%;
//   height: 35px;
//   margin-top: 10px;
//   margin-left: 26px;
//   margin-right: 26px;
// `;


export default ({ close, id, comments, setSelfComments}) => {


  const [removeCommentMutation] = useMutation(DELETE_COMMENT, {
    variables: { id }, refetchQueries: [{query:FEED_QUERY}]

  });

  const delComment = async () => {
  
  await removeCommentMutation();
  setSelfComments([...comments].filter(comment => comment.id !== id))
  }

  return (<div className="menu">
      <Div>
        <SpanS onClick={() => delComment() }>삭제</SpanS>
        <Span onClick={close}>닫기</Span>

      </Div>
    </div>
  )
};
