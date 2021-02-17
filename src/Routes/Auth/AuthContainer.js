import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOG_USER_IN, CONFIRM_USER, CHECK_EMAIL, FIND_PW, UPDATE_PW, CHECK_EMAILPW } from "./AuthQueries";
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
    email.setValue(response.profileObj.email);
    firstName.setValue(response.profileObj.givenName)
    lastName.setValue(response.profileObj.familyName)
    const [GGusername] = response.profileObj.email.split('@');
    username.setValue(GGusername);
    setAction('signUp');
  }

  const responseFacebook = async (response) => {
    console.log(response.email)
    email.setValue(response.email);
    firstName.setValue(response.first_name);
    lastName.setValue(response.last_name);
    const [FBusername] = response.email.split('@');
    username.setValue(FBusername);
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

  const [checkemailQuery] = useMutation(CHECK_EMAIL, {
    variables: {
      email: email.value
    }
  });


  const [checkemailpwQuery] = useMutation(CHECK_EMAILPW, {
    variables: {
      email: email.value
    }
  });

  const [findrequestSecretMutation] = useMutation(FIND_PW, {
    variables: {
      email: email.value
    }
  })

  const [updatePwMutation] = useMutation(UPDATE_PW, {
    variables: {
      email: email.value,
      password: password.value
    }
  })
  const onSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (action === "logIn") {
      if (email.value !== "" || emailRegex) {
        try {
          const { data: { checkemail } } = await checkemailQuery();
          console.log(checkemail)
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

      if (password.value !== "" || pwdRegex) {
        const { data: { confirmUser } } = await confirmUserMutation();
        if (confirmUser !== "TryAgain") {
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
          console.log(requestSecret);
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
        password.value !== "" && pwdRegex
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
            throw Error();
          }
        } catch (error) {
          console.log(error);
          toast.error('Woops! 비밀코드가 일치하지 않아요!');
        }
      }
    } else if (action === "FindPw") {
      if (email.value !== "") {
        try {
          const { data: { pwCheckemail } } = await checkemailpwQuery();
          console.log(pwCheckemail)
          if (pwCheckemail) {
            const { data: { findrequestSecret } } = await findrequestSecretMutation();
            console.log(findrequestSecret)
            if (findrequestSecret) {
              toast.success('비밀번호를 입력해주세요!')
              setAction('ConfirmSc');
            } else {
              toast.error("다시 시도해주세요");
            }
          } else {
            toast.error("Woops!, 등록된 정보가 없어요! 회원가입으로 안내해 드릴게요!");
            setTimeout(() => setAction("signUp1"), 3000);
          }
        } catch (e) {
          console.log(e);
          toast.error("Woops!, 다시 시도해주세요!");
        }
      } else {
        toast.error("이메일은 반드시 작성해야해요!");
      }
    } else if (action === 'ConfirmSc') {
      if (secret.value !== "") {
        try {
          const { data: { confirmSecret } } = await confirmSecretMutation();
          if (confirmSecret !== "" && confirmSecret !== undefined) {
            setAction('setPw');
          } else {
            throw Error();
          }
        } catch (error) {
          console.log(error);
          toast.error('Woops! 비밀코드가 일치하지 않아요!');
        }
      }
    } else if (action === 'setPw') {
      try {
        const { data: { updatePw } } = await updatePwMutation();
        if (updatePw.id !== "") {
          toast.success("변경된 비밀번호로 로그인을 해주세요!")
          setAction("logIn")
        }
      } catch (e) {
        console.log(e)
        toast.error("오류! 오류!")
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