import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from 'react-google-login';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.ivoryColor};
  cursor: pointer;
  margin-bottom: 10px;
`;

const LinkCon = styled.div`
  margin-bottom : 10px;
`;


const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
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
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  setAction,
  secret,
  onSubmit,
  password,
  responseFacebook,
  responseGoogle
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"이메일"} {...email} type="email" />
          <Button text={"다음"} />
        </form>
      )}{action === "logIn1" && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"비밀번호 최소 8자 문자 숫자 하나 이상"}{...password} type="password" />
          <Button text={"로그인"} />
        </form>
      )}{action === "signUp1" && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"Email"} {...email} type="email" />
          <Button text={"이메일 확인"} />
          <FacebookLogin
            appId="950295009072300"
            autoLoad={false}
            fields="name,first_name,last_name,email"
            callback={responseFacebook}
            render={renderProps => (
              <Button bgColor={"#2D4DA7"} onClick={renderProps.onClick} text={"페이스북계정으로 회원가입"} />
            )}

          />
          <GoogleLogin
            clientId="279164621755-f168i4jn1vn7da4t0lkd63hlcaprl0mf.apps.googleusercontent.com"
            render={renderProps => (
              <Button bgColor={"#E34133"} onClick={renderProps.onClick} text={"구글계정으로 회원가입"} />
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </form>
      )}{action === 'signUp' && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"이름"} {...firstName} />
          <Input placeholder={"성"} {...lastName} />
          <Input placeholder={"이메일"} {...email} type="email" />
          <Input placeholder={"닉네임"} {...username} />
          <Input placeholder={"비밀번호 최소 8자 문자 숫자 하나 이상"}{...password} type="password" />
          <Button text={"회원가입"} />
        </form>
      )}
      {action === 'FindPw' && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"이메일"} {...email} type="email" />
          <Button text={"전송"} />
        </form>
      )}
      {action === 'ConfirmSc' && <form onSubmit={onSubmit}>
        <Input placeholder="전송된 값을 입력해주세요!" required {...secret} />
        <Button text={'다음'} />
      </form>}
      {action === 'confirm' && <form onSubmit={onSubmit}>
        <Input placeholder="전송된 값을 입력해주세요!" required {...secret} />
        <Button text={'확인'} />
      </form>
      }
      {action === 'setPw' && <form onSubmit={onSubmit}>
        <Input placeholder={"비밀번호 최소 8자 문자 숫자 하나 이상"}{...password} type="password" />
        <Button text={'확인'} />
      </form>}
    </Form>
    {action !== 'confirm' && (
      <StateChanger>
        {action === "logIn" ? (
          <>
            
            <LinkCon>계정이 없으신가요?{" "}<Link onClick={() => setAction("signUp1")}>회원가입하기!<br /></Link></LinkCon>
           
            비밀번호를 잊으셨나요?{" "}<Link onClick={() => setAction("FindPw")}>여기로!</Link>
          </>
        ) : (
            <>
              계정이 있으신가요?{" "}
              <Link onClick={() => setAction("logIn")}>로그인하기!</Link>
            </>
          )}
      </StateChanger>)}
  </Wrapper>
);