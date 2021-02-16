import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import StateButtonPresenter from "./StateButtonPresenter";
import { SET_STATE } from "./StateButtonQueries";
import { ME } from "../../SharedQueries";

const StateButtonContainer = ({ state }) => {
    const [states, setStates] = useState(state);

    const [stateMutation] = useMutation(SET_STATE)

    const onClick = () => {
        if (states === "1") {
            setStates("2");
            stateMutation({
                variables: {
                    state: "2"
                }, refetchQueries: [{ query: ME }]
            });
        } else if (states === "2") {
            setStates("1");
            stateMutation({
                variables: {
                    state: "1"
                }, refetchQueries: [{ query: ME }]
            });
        }
    }
    return <StateButtonPresenter onClick={onClick} state={states} />
};

StateButtonContainer.propTypes = {
    state: PropTypes.string,
}
export default StateButtonContainer;