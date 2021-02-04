import React from "react";
import styled from "styled-components";
import Weather from "../Weather";
import Covid from "../Covid";
import "./ContainerCss.css";
import "./Plus.css";
import "./Minus.css"

const EventContainer = styled.div`
  display: inline-block;
  width : 150px;
  height : 31px;
  overflow: hidden;
`;

export const EventInfo = ({ temp, weather, location, data }) => {
    return <EventContainer>
        <div className={"container"} id={"weather"}>
            <Weather temp={temp} weather={weather} />
            <Covid location={location} data={data} />
        </div>
    </EventContainer>
};

