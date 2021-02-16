import React, { useState } from 'react';
import './Hashtag.css';

export const TagsInput = props => {
    const [tags, setTags] = useState(props.tags);
    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    return (
        <>
            <div className="tages-input">
                <ul id="tags">
                    {tags.map((tag, index) => (
                        <li key={index} className="tag">
                            <span className='tag-close-icon'
                                onClick={() => removeTags(index)}
                            >
                                x
						</span>
                            <span className='tag-title' onClick={() => Linktags(tag)}>{tag}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="tags-input">
                <input
                    type="text"
                    onKeyUp={event => event.key === ";" ? addTags(event) : null}
                    placeholder="Press ; to add tags"
                />
            </div>
        </>
    );
};