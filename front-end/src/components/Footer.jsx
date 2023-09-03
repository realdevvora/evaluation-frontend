import React from 'react'
import '../App.css'
import twitter_logo from "../images/twitter-logo.png"
import ig_logo from "../images/ig-logo.png"

export default function Footer() {
    return (
        <footer className="social-tags">
        <a href="https://twitter.com/notdevvora">
            <img src={twitter_logo} alt="twitter" width="30"/>
        </a>
        <a href="https://www.instagram.com/isdevvora/">
            <img src={ig_logo} alt="instagram" width="30"/>
        </a>
    </footer>
    )
}