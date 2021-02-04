// import React, { useState } from "react";
// import AuthPresenter from "./AuthPresenter";
// import useInput from "../../Hooks/useInput";
// import { useMutation } from "react-apollo-hooks";
// import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOG_USER_IN } from "./AuthQueries";
// import { toast } from "react-toastify";

// export default () => {
//   const [action, setAction] = useState("logIn");
//   const username = useInput("");
//   const firstName = useInput("");
//   const secret = useInput("");
//   const lastName = useInput("");
//   const email = useInput("");

//   const [requestSecretMutation] = useMutation(LOG_IN, {
//     variables: { email: email.value }
//   });
//   const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
//     variables: {
//       email: email.value,
//       username: username.value,
//       firstName: firstName.value,
//       lastName: lastName.value
//     }
//   });
//   const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
//     variables: {
//       email: email.value,
//       secret: secret.value
//     }
//   });

//   const [logUserInMutation] = useMutation(LOG_USER_IN)

//   const onSubmit = async e => {
//     e.preventDefault();
//     if (action === "logIn") {
//       if (email.value !== "") {
//         try {
//           const { data: { requestSecret } } = await requestSecretMutation();
//           console.log(requestSecret);
//           if (!requestSecret) {
//             toast.error("Woops!, 등록된 정보가 없어요! 회원가입으로 안내해 드릴게요!");
//             setTimeout(() => setAction("signUp"), 3000);
//           } else {
//             toast.success('이메일함에서 시크릿 코드를 확인해주세요!')
//             setAction('confirm');
//           }
//         } catch {
//           toast.error("Woops!, 다시 시도해주세요!");
//         }
//       } else {
//         toast.error("이메일은 반드시 작성해야해요!");
//       }
//     } else if (action === "signUp") {
//       if (
//         email.value !== "" &&
//         username.value !== "" &&
//         firstName.value !== "" &&
//         lastName.value !== ""
//       ) {
//         try {
//           const { data: { createAccount } } = await createAccountMutation();
//           if (!createAccount) {
//             toast.error("Woops! 잠시만요! 다시 시도해주세요!");
//           } else {
//             toast.success("환영해요! 당신만을 기다렸어요!");
//             setTimeout(() => setAction("logIn"), 3000);
//           }
//         } catch (e) {
//           toast.error(e.message);
//         }
//       } else {
//         toast.error("모든 양식을 작성해 주세요!");
//       }
//     } else if (action === "confirm") { 
//       if (secret.value !== "") { 
//         try {
//           const { data: { confirmSecret: token } } = await confirmSecretMutation();
//           if (token !== "" && token !== undefined) {
//             await logUserInMutation({ variables: { token } });
//           } else {
//             throw Error();
//           } 
//         } catch (e) { 
//           toast.error('Woops! 비밀코드가 일치하지 않아요!');
//         }
//       }
//     }
//   };

//   return (
//     <AuthPresenter
//       setAction={setAction}
//       action={action}
//       username={username}
//       firstName={firstName}
//       lastName={lastName}
//       email={email}
//       secret={secret}
//       onSubmit={onSubmit}
//     />
//   );
// };
import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOG_USER_IN, CONFIRM_USER, CHECK_EMAIL } from "./AuthQueries";
import { toast } from "react-toastify";


export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const secret = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const password = useInput("");

  const responseGoogle = (response) => {
    email.setvalue(response.profileObj.email);
    firstName.setvalue(response.profileObj.givenName)
    lastName.setvalue(response.profileObj.familyName)
    const [GGusername] = response.profileObj.email.split('@');
    username.setvalue(GGusername);
    setAction('signUp');
  }

  const responseFacebook = async (response) => {
    console.log(response)
    email.setvalue(response.email);
    firstName.setvalue(response.first_name);
    lastName.setvalue(response.last_name);
    const [FBusername] = response.email.split('@');
    username.setvalue(FBusername);
    setAction('signUp');
  }
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const [confirmUserMutation] = useMutation(CONFIRM_USER, {
    variables: {
      email: email.value,
      password: password.value
    }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value
    }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });

  const [logUserInMutation] = useMutation(LOG_USER_IN);

  const checkemailQuery = useQuery(CHECK_EMAIL, {
    variables: {
      email: email.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const { data: { checkemail } } = await checkemailQuery;
          if (!checkemail) {
            toast.error("Woops!, 등록된 정보가 없어요! 회원가입으로 안내해 드릴게요!");
            setTimeout(() => setAction("signUp1"), 3000);
          } else {
            toast.success('비밀번호를 입력해주세요!')
            setAction('logIn1');
          }
        } catch (e) {
          console.log(e);
          toast.error("Woops!, 다시 시도해주세요!");
        }
      } else {
        toast.error("이메일은 반드시 작성해야해요!");
      }
    } else if (action === "logIn1") {
      if (password.value !== "") {
        const { data: { confirmUser } } = await confirmUserMutation();
        console.log(confirmUser);
        if (confirmUser !== "츄라이 츄라이 어게인") {
          await logUserInMutation({ variables: { token: confirmUser } });
        }
        else {
          toast.error("비밀번호가 틀렸습니다 다시 시도해주세요");
          setAction('logIn1');
        }
      } else {
        toast.error("비밀번호를 입력해주세요")

      }
    } else if (action === "signUp1") {
      if (email.value !== "") {
        try {
          const { data: { requestSecret } } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("다시 시도 해주세요/ 이메일이 중복되었습니다")
          } else {
            toast.success('이메일함에서 시크릿 코드를 확인해주세요')
            setAction('confirm')
          }
        } catch (e) {
          console.log(e);
        }
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== "" &&
        password.value !== ""
      ) {
        try {
          const { data: { createAccount } } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Woops! 잠시만요! 다시 시도해주세요!");
          } else {
            toast.success("환영해요! 당신만을 기다렸어요!");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("모든 양식을 작성해 주세요!");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const { data: { confirmSecret } } = await confirmSecretMutation();
          console.log("토큰은 :" + confirmSecret);
          if (confirmSecret !== "" && confirmSecret !== undefined) {
            setAction('signUp');
          } else {
            console.log(confirmSecret)
            throw Error();
          }
        } catch (error) {
          console.log(error);
          toast.error('Woops! 비밀코드가 일치하지 않아요!');
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      password={password}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
      responseFacebook={responseFacebook}
      responseGoogle={responseGoogle}

    />
  );
};