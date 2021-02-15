import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import Avatar from "../../Components/Avatar";
import { Setting } from "../../Components/Icons";
import Popup from 'reactjs-popup';
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const WhiteBox = styled.div`
text-align: center;
border: 1px solid #e6e6e6;
border-Radius: 4px;
background-color: #f0f0f0;
width : 600px;
height:600px;
  padding: 40px;
  padding-bottom: 30px;
  padding-top: 50px;
  margin-bottom: 15px;
  form {width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;}
    }
    button {margin-top: 10px;}
  }
`
const Avaterm = styled(Avatar)`
    margin: 10px auto
`
const Inputs = styled.div`
 width: 40%;
   display: inline-grid;
`
const Buttons = styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: center;
`
const Button = styled.button`
  width: 15%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.navyColor};
 padding: 11px 0px;
  margin: inherit;
   margin:0 5%;
  cursor:pointer;
  display: block;
`;

const Text = styled.text`
display: flex;
`
const TextInput = styled.input`
  border: 0;
  border: 1px solid #d1d1d1;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
  margin-top: 10px;
  margin-bottom: 15px;
`
const Button1 = styled.span`
  cursor: pointer;
`;

const EDIT_USER = gql`
    mutation editUser(
        $username:String
        $email:String
         $firstName:String
        $lastName:String
        $bio:String)
    { editUser(
    username : $username
    email : $email
    firstName : $firstName
    lastName : $lastName
    bio : $bio
    )
  }`

export default ({ data, setUserInfo, userInfo }) => {
  const username = useInput(userInfo.username);
  const firstName = useInput(userInfo.firstName);
  const lastName = useInput(userInfo.lastName);
  const bio = useInput(userInfo.bio);

  const [loading, setLoading] = useState(false);
  const [editUserMutation] = useMutation(EDIT_USER, {
    variables: {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      bio: bio.value,
    }
  });

  return (
    <Popup modal
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
      // nested
      trigger={
        <Button1 >
          <Setting />
        </Button1>}>

      {(close) => {
        const onSubmit = async () => {
          if (userInfo.username !== username.value ||
            userInfo.firstName !== firstName.value ||
            userInfo.lastName !== lastName.value ||
            userInfo.bio !== bio.value) {
            setLoading(true)

            const { data: { editUser } } = await editUserMutation();
            if (editUser === true) {
              setUserInfo({
              username: username.value,
              firstName: firstName.value,
              lastName: lastName.value,
              bio: bio.value,
              })

              setLoading(false)
              close()
            } else if (editUser === false) {
              toast.error("이미 사용중인 닉네임입니다😥");
              setLoading(false)
            }
          }
        }
        return (<WhiteBox>
          <Avaterm size="md" url={data.avatar} />
          <Inputs>
            {userInfo.username}
            <Text style={{ marginTop: 30 }}>닉네임 : </Text><TextInput {...username} placeholder={"닉네임"} />
            <Text>이름 : </Text><TextInput {...firstName} placeholder={"이름"} />
            <Text>성 : </Text><TextInput {...lastName} placeholder={"성"} />
            <Text>소개: </Text ><TextInput {...bio} placeholder={"상태메세지"} />
          </Inputs>
          <Buttons>
            <Button disabled={loading} onClick={onSubmit}>{loading && <Loader />}수정</Button>
            <Button onClick={close}>취소</Button>
          </Buttons>
        </WhiteBox>
        )
      }
      }
    </Popup>
  )
}


