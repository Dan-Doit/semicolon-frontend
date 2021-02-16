import React, { useState } from "react";
import Popup from 'reactjs-popup';
import styled from "styled-components";
import useInput from "../Hooks/useInput";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Routes/Feed";
import Loader from "./Loader";

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};

const Inputs = styled.div`
  text-align: center;
`
const Text = styled.text`
`
const Button = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.navyColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor:pointer;
  display: inline;
  margin: auto;
  width: 10%;
  height: 35px;
  margin-top: 10px;
  margin-left: 26px;
  margin-right: 26px;
`;
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

const EDIT_POST = gql`
  mutation editPost(
    $id : String!,
  $caption:String!
  ) { editPost(
    id: $id,
     caption: $caption) 
  }
`;
const DELETE_POST = gql`
  mutation deletePost(
    $id : String!
  ) { 
    deletePost(id: $id ) 
  }
`;
export default ({ close, id, setCopycaption, Copycaption, setIsLoader, setDeletePost }) => {
  const [loading, setLoading] = useState(false);
  const editCaption = useInput();
  const [editPostMutation] = useMutation(EDIT_POST,
    {
      variables: { id, caption: editCaption.value },
      refetchQueries: [{ query: FEED_QUERY }]
    });
  const [deletePostMutation] = useMutation(DELETE_POST, { variables: { id } });

  const editSubmit = async () => {
    setLoading(true)
    setCopycaption(editCaption.value);
    await editPostMutation()
    setLoading(false)
    close()
  }
  const deletePost = async () => {
    close()
    setIsLoader(false)
    await deletePostMutation();
    setDeletePost(false)
  }

  return (<Popup
    modal
    overlayStyle={{ background: "rgba(0,0,0,0.5" }}
    contentStyle={contentStyle}
    closeOnDocumentClick={false}
    trigger={(open) => (
      <div className="menu">
        <Div>
  
          <SpanS onClick={() => { deletePost() }}>삭제</SpanS>
          <Span open={open}>제목수정</Span>
          <Span onClick={close}>닫기</Span>
        </Div>
      </div >
    )}
  >

    {(close) => (<Inputs>  <textarea placeholder={Copycaption} style={{ resize: "none" }} rows={7} cols={30} {...editCaption} onChange={editCaption.onChange} />
      <Inputs><Button disabled={loading} onClick={() => { editSubmit() }}> {loading ? <Loader /> : <Text>수정</Text>} </Button>
        <Button disabled={loading} onClick={close}> {loading ? <Loader /> : <Text>취소</Text>}</Button></Inputs></Inputs>)}
  </Popup>)
}

