import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT, DELETE_COMMENT } from "./DetailPostQueries";
import useInput from "../../Hooks/useInput";
import TextareaAutosize from "react-autosize-textarea";


const Button = styled.span`
  cursor: pointer;
`;
const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const CommentPresenter = ({ commentId, open }) => {
    const [state, setState] = useState(true);
    const [myId, setMyId] = useState(commentId);
    const [selectedId, setSelectedId] = useState();
    const [openRelpy, setOpenRelpy] = useState(open);

    const onKeyUp = async event => {
        setOpenRelpy(!openRelpy);
//         const { which } = event;
//         if (which === 13) {
//         event.preventDefault();
//     try {
//         const {
//           data: { addComment }
//         } = await addCommentMutation();
//         setSelfComments([...selfComments, addComment]);
//         comment.setValue("");
//     } catch {
//         toast.error("Can't send comment 😔");
//       }
      
//     }
  };

    const setArr = () => {
       if (selectedId === myId) {
            setSelectedId("default");
        } else { 
            setSelectedId(myId);
        }
    }


    const comparing = () => {
        setState(!state);
    }

    useEffect(() => { 
        comparing();
    }, [selectedId])




    return (
    <Button onClick={onKeyUp}>
            답글달기
            {openRelpy &&
                <Textarea
                    placeholder={"Add a comment..."}
                    // value={newComment.value}
                    // onChange={newComment.onChange}
                    onKeyPress={onKeyUp}
                />} 
    </Button>
    )
};


CommentPresenter.propTypes = {
    commentId: PropTypes.string.isRequired
};

export default CommentPresenter;
