import React from "react"

export default (props) => {
    return (
        <span>{props.value ? "Yes" : "No"}</span>
    )
}