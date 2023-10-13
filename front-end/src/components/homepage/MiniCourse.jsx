import React from "react";
import { useNavigate } from "react-router-dom";


export default function MiniCourse(props) {
    const {name, description, link} = props
    const navigate = useNavigate()


    return (
            <div className="home--page--course" onClick={() => navigate(link)}>
                <h1>{name}</h1>
                <div className="home--review--scores">
                    <h4>{description}</h4>
                </div>
            </div>
    )
}