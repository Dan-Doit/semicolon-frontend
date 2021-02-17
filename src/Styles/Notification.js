import styled from "styled-components";

export const Container = styled.div`
  flex: 1;

  align-items: center;
  background-color: #ffffff;
`;

export const Card = styled.button`
  width: 100%;
`;

export const UserInfo = styled.div`
  flex-direction: row;
  justify-content: space-between;
   margin: 11px;
   border-bottom: lightgray 1px solid;
   padding-top: 10px;
    padding-bottom: 10px;
`;

export const UserImgWrapper = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextSection = styled.div`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export const UserInfoText = styled.div`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  
`;

export const UserInfoText1 = styled.div`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-left:15px;
  
`;

export const UserName = styled.text`
  font-size: 14px;
  font-weight: bold;
`;

export const PostTime = styled.text`
  font-size: 12px;
  margin-right : 32px;
  color: #666;
`;

export const MessageText = styled.text`
  font-size: 14px;
  color: #333333;
`;

export const Story = styled.button`
`;