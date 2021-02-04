import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaStar, FaRegStar } from "react-icons/fa";
import Theme from "../../Styles/Theme";
import { COMMENT_LIKE  } from "./DetailPostQueries";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../../Routes/Feed";

const Button = styled.span`
  cursor: pointer;
  float: right;
`;

const LikePresenter = ({ commentId, isCommented }) => {
    
    const [CommentLikeMutation] = useMutation(COMMENT_LIKE, {
        variables: { commentId: commentId }, refetchQueries: [{query:FEED_QUERY}]
    });

    const [state, setState] = useState(isCommented);
    const comparing = () => {
        CommentLikeMutation();
        if (state === true) {
            setState(false);
        } else {
            setState(true);
        }
    }
    // useEffect(() => { 
    //     comparing();
    // },[selectedId])

    return <Button onClick={comparing}>
        {state ? <FaStar size={15} color={Theme.starColor} /> : <FaRegStar size={15 }/>}
    </Button>
};


LikePresenter.propTypes = {
    isCommented:PropTypes.bool.isRequired,
    commentId: PropTypes.string.isRequired
};

export default LikePresenter;