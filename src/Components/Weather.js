import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IoSunnyOutline, IoPartlySunnyOutline, IoRainyOutline } from "react-icons/io5";
import { BsCloud } from "react-icons/bs";
import { WiSandstorm } from "react-icons/wi";
import { RiThunderstormsLine, RiDrizzleLine, RiHazeLine } from "react-icons/ri";
import { IoIosSnow } from "react-icons/io"
import { BiWater } from "react-icons/bi"

const Text = styled.span`
  font-size:20px;
  font-weight: 600;
`;

const Div = styled.div`
`;

const weatherOption = (weather, temp) => {
    if (weather === "Clear") return <Div><IoSunnyOutline size={30} /><Text> {temp}°</Text></Div>
    else if (weather === "Thunderstorm") return <Div><RiThunderstormsLine size={30} /><Text> {temp}°</Text></Div>
    else if (weather === "Drizzle") return <Div><RiDrizzleLine size={30} /><Text> {temp}°</Text></Div>
    else if (weather === "Rain") return <Div><IoRainyOutline size={30} /><Text> {temp}°</Text></Div>
    else if (weather === "Snow") return <Div><IoIosSnow size={30} /><Text> {temp}°</Text></Div>
    else if (weather === "Clouds") return <Div><BsCloud size={30} /><Text> {temp}°</Text></Div>
    else if (weather === "Mist") return <Div><BiWater size={30} /><Text> {temp}°</Text></Div>
    else if (weather === "Dust") return <Div><WiSandstorm size={30} /><Text> {temp}°</Text></Div>
    else if (weather === "Haze") return <Div><RiHazeLine size={30} /><Text> {temp}°</Text></Div>
    else return <Div><IoPartlySunnyOutline size={30} /><Text> {temp}°</Text></Div>
}

export const Weather = ({ temp="10.1", weather="Clear" }) => {
    return weatherOption(weather,parseInt(temp))
};

Weather.propTypes = {
    temp: PropTypes.string.isRequired,
    weather : PropTypes.string.isRequired
};

export default Weather;