import React from "react";


export default function MiniCourse(props) {
    const {name, rating, difficulty} = props


    return (
        <div className="home--page--course">
            <h1>{name}</h1>
            <div className="home--review--scores">
                <h4>{rating}</h4>
                <h4>{difficulty}</h4>
            </div>
        </div>
    )
}