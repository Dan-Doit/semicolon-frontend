import React from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import Popup from 'reactjs-popup';
import "../Styles/Menu.css";
import Menu from "./Menu";
import "../Styles/PopUp.css";
import styled from "styled-components";



const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};

const Div1 = styled.div`

`;

export default ({ setSelfComments, id, comments }) => (

  <Popup

    modal
    overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
    contentStyle={contentStyle}
    closeOnDocumentClick={false}
    trigger={(open) => <Div1 className={"Box"}><IoEllipsisHorizontalSharp size={16} open={open} /></Div1>}
  >


    {(close) => <Menu close={close} id={id} comments={comments} setSelfComments={setSelfComments} />}
  </Popup>

);