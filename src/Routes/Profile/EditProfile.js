import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import Avatar from "../../Components/Avatar";
import { GET_USER } from "./ProfileContainer";

const WhiteBox = styled.div`
text-align: center;
border: 1px solid #e6e6e6;
border-Radius: 4px;
background-color: white;
width : window.innerWidth /2.5
height:window.innerHeight
  padding: 40px;
  padding-bottom: 30px;
  padding-top: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`
const Avaterm = styled(Avatar)`
    margin: auto
`
const Inputs = styled.div`
 width: 40%;
   display: inline-grid;
`
const Buttons = styled.div`
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
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
  margin-top: 10px;
    margin-bottom: 15px;
`
const EDIT_USER = gql`
    mutation editUser(
        $username:String
        $email:String
         $firstName:String
        $lastName:String
        $bio:String
        $avatar:String
    )
    {editUser(
    username : $username
    email : $email
    firstName : $firstName
    lastName : $lastName
    bio : $bio
    avatar : $avatar
    )
  }`

export default ({ data, setUserInfo, setEditProfile, userInfo }) => {
    console.log("eede")
  const username = useInput(userInfo.username);
  const firstName = useInput(userInfo.firstName);
  const lastName = useInput(userInfo.lastName);
  const bio = useInput(userInfo.bio);

  const [editUserMutation] = useMutation(EDIT_USER, {
    variables: {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      bio: bio.value,
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setUserInfo({
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      bio: bio.value,
    })
    const { data } = await editUserMutation();
    setEditProfile(false);
  }
    return (
      <Text>deeg</Text>
    // <WhiteBox>
    //   <Avaterm size="md" url={data.avatar} />
    //   <Inputs>
    //     {data.username}
    //     <Text>닉네임 : </Text><TextInput {...username} placeholder={"UserName"} />
    //     <Text>이름 : </Text><TextInput {...firstName} placeholder={"firstName"} />
    //     <Text>성 : </Text><TextInput {...lastName} placeholder={"lastName"} />
    //     <Text>소개: </Text ><TextInput {...bio} placeholder={"bio"} />
    //   </Inputs>
    //   <Buttons>
    //     <Button onClick={onSubmit}>Submit</Button>
    //     <Button onClick={() => setEditProfile(false)}>Cancel</Button>
    //   </Buttons>
    // </WhiteBox>
  )
}


