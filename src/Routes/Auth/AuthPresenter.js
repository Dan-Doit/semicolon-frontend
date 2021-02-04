// import React from "react";
// import styled from "styled-components";
// import Input from "../../Components/Input";
// import Button from "../../Components/Button";

// const Wrapper = styled.div`
//   min-height: 80vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

// const Box = styled.div`
//   ${props => props.theme.whiteBox}
//   border-radius:0px;
//   width: 100%;
//   max-width: 350px;
// `;

// const StateChanger = styled(Box)`
//   text-align: center;
//   padding: 20px 0px;
// `;

// const Link = styled.span`
//   color: ${props => props.theme.ivoryColor};
//   cursor: pointer;
// `;

// const Form = styled(Box)`
//   padding: 40px;
//   padding-bottom: 30px;
//   margin-bottom: 15px;
//   form {
//     width: 100%;
//     input {
//       width: 100%;
//       &:not(:last-child) {
//         margin-bottom: 7px;
//       }
//     }
//     button {
//       margin-top: 10px;
//     }
//   }
// `;

// export default ({
//   action,
//   username,
//   firstName,
//   lastName,
//   email,
//   setAction,
//   secret,
//   onSubmit
// }) => (
//   <Wrapper>
//     <Form>
//       {action === "logIn" && (
//         <form onSubmit={onSubmit}>
//           <Input placeholder={"Email"} {...email} type="email" />
//           <Button text={"Log in"} />
//         </form>
//       )}{ action === 'signUp' && (
//         <form onSubmit={onSubmit}>
//           <Input placeholder={"First name"} {...firstName} />
//           <Input placeholder={"Last name"} {...lastName} />
//           <Input placeholder={"Email"} {...email} type="email" />
//           <Input placeholder={"Username"} {...username} />
//           <Button text={"Sign up"} />
//         </form>
//       )}
//       {action === 'confirm' && <form onSubmit={onSubmit}>
//         <Input placeholder="전송된 값을 입력해주세요!" required {...secret} />
//         <Button text={'Confirm'} />
//         </form>
//         }
//     </Form>
//     {action !== 'confirm' && (
//       <StateChanger>
//       {action === "logIn" ? (
//         <>
//           Don't have an account?{" "}
//           <Link onClick={() => setAction("signUp")}>Sign up</Link>
//         </>
//       ) : (
//         <>
//           Have an account?{" "}
//           <Link onClick={() => setAction("logIn")}>Log in</Link>
//         </>
//       )}
//     </StateChanger>)}
//   </Wrapper>
// );
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
          <Input placeholder={"Email"} {...email} type="email" />
          <Button text={"Next"} />
        </form>
      )}{action === "logIn1" &&(
        <form onSubmit={onSubmit}>
          <Input placeholder={"PassWord"}{...password} type="password"/>
          <Button text={"Log in"}/>
        </form>
      )}{action ==="signUp1" &&(
        <form onSubmit={onSubmit}>
          <Input {...email} type="email"/>
          <Button text={"Check email"} />
          <FacebookLogin
            appId="950295009072300"
            autoLoad={false}
            fields="name,first_name,last_name,email"
            callback={responseFacebook}
            render={renderProps => (
              <Button bgColor={"#2D4DA7"} onClick={renderProps.onClick} text={"This is my custom Facebook button"} />
            )}
            
          />
          <GoogleLogin
            clientId="279164621755-f168i4jn1vn7da4t0lkd63hlcaprl0mf.apps.googleusercontent.com"
            render={renderProps => (
              <Button bgColor={"#E34133"} onClick={renderProps.onClick} text={"This is my custom Google button"}/>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </form>
      )}{ action === 'signUp' && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"First name"} {...firstName} />
          <Input placeholder={"Last name"} {...lastName} />
          <Input placeholder={"Email"} {...email} type="email" />
          <Input placeholder={"Username"} {...username} />
          <Input placeholder={"Password"}{...password} type="password"/>
          <Button text={"Sign up"} />
        </form>
      )}
      {action === 'confirm' && <form onSubmit={onSubmit}>
        <Input placeholder="전송된 값을 입력해주세요!" required {...secret} />
        <Button text={'Confirm'} />
        </form>
        }
    </Form>
    {action !== 'confirm' && (
      <StateChanger>
      {action === "logIn" ? (
        <>
          Don't have an account?{" "}
          <Link onClick={() => setAction("signUp1")}>Sign up</Link>
        </>
      ) : (
        <>
          Have an account?{" "}
          <Link onClick={() => setAction("logIn")}>Log in</Link>
        </>
      )}
    </StateChanger>)}
  </Wrapper>
);