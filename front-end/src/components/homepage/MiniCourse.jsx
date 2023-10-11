import React from "react";


export default function MiniCourse(props) {
    const {name, description} = props


    return (
        <div className="home--page--course">
            <h1>{name}</h1>
            <div className="home--review--scores">
                <h4>{description}</h4>
            </div>
        </div>
    )
}