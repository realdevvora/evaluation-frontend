import React from 'react'
import '../App.css'
import twitter_logo from "../images/twitter-logo.png"

export default function Footer() {
    return (
        <footer className="social-tags">
        <a href="https://twitter.com/notdevvora">
            <img src={twitter_logo} alt="twitter" width="30"/>
        </a>
    </footer>
    )
}