import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { EventInfo } from "./EventInfoPresenter";

const EnventInfoContainer = ({ location, data, temp, weather }) => {
    const [state, setState] = useState("weather");
    
    const changeData = () => {
        if (state === "weather") {
            setTimeout(() => {
                document.getElementById("weather").classList.add('minus');
                document.getElementById("weather").classList.remove('plus');
                setState("covid")
            }, 5000);
        } else if (state === "covid") {
            setTimeout(() => {
                document.getElementById("weather").classList.add('plus');
                document.getElementById("weather").classList.remove('minus');
                setState("weather")
            }, 5000);
        }
    }

    useEffect(() => {
        changeData();
    },[state])
 
    return <EventInfo location={location} data={data} temp={temp} weather={weather} />;
};

EnventInfoContainer.propTypes = {
    location: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    temp:PropTypes.string.isRequired,
    weather:PropTypes.string.isRequired   
};

export default EnventInfoContainer;