import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RiVirusLine } from "react-icons/ri";

const Text = styled.span`
  font-size:15px;
  font-weight: 600;
`;


export const Covid = ({ location='인천', data='0' }) => {
    return <><RiVirusLine size={30}/> <Text>{location} {data}명</Text></>
};

Covid.propTypes = {
    location: PropTypes.string.isRequired,
    data : PropTypes.string.isRequired
};

export default Covid;