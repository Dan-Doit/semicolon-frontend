import React from "react";
import Button from "../Button";

export default ({ state, onClick }) => {
    return (
        <Button text={state === "1" ? "친구만공개" : "전체공개"} onClick={onClick} />
    );
}