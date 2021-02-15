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
    overlayStyle={{ background: "rgba(255,255,255,0.8" }}
    contentStyle={contentStyle}
    closeOnDocumentClick={false}
    trigger={(open) => (
      <div className="menu">
        <ul>
          <li open={open}>제목수정</li>
          <li onClick={() => { deletePost() }}>삭제</li>
          <li onClick={close}>닫기</li>
        </ul>
      </div >
    )}
  >

    {(close) => (<Inputs>  <textarea placeholder={Copycaption} style={{ resize: "none" }} rows={7} cols={30} {...editCaption} onChange={editCaption.onChange} />
      <Inputs><Button disabled={loading} onClick={() => { editSubmit() }}> {loading ? <Loader /> : <Text>수정</Text>} </Button>
        <Button disabled={loading} onClick={close}> {loading ? <Loader /> : <Text>취소</Text>}</Button></Inputs></Inputs>)}
  </Popup>)
}


