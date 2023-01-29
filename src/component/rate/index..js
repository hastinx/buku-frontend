import React from 'react'
import ReactStars from "react-rating-stars-component";

const Rate = (props) => {
    return (
        <ReactStars
            count={5}
            edit={false}
            value={props.rating}
            size={24}
            activeColor="#ffd700"
        />
    )
}

export default Rate