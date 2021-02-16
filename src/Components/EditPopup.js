import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import EditMenu from "./EditMenu"
import Popup from 'reactjs-popup';
import "../Styles/Menu.css";
import React from "react";

const contentStyle = {
    background: "rgba(255,255,255,0)",
    width: "80%",
    border: "none"
};

export default ({ id, setCopycaption, Copycaption, setIsLoader, setDeletePost }) => {
    return (<Popup
        modal
        overlayStyle={{ background: "rgba(0,0,0,0.5" }}
        contentStyle={contentStyle}
        closeOnDocumentClick={false}
        trigger={(open) => <IoEllipsisHorizontalSharp open={open} />}>

        {(close) => <EditMenu setIsLoader={setIsLoader} setDeletePost={setDeletePost} close={close} id={id} setCopycaption={setCopycaption} Copycaption={Copycaption} />}
    </Popup>
    )
}