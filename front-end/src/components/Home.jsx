import React from 'react'
import '../App.css'
import Footer from './Footer'
import review_anecdotes from "../images/review_anecdotes.png"
import Searchbar from './Searchbar'
import MiniCourse from './homepage/MiniCourse'

function Home() {

  return (
    <div className="home--page">
      <div className="home--hero">
        <h3>honest opinions of your fellow peers.</h3>
      </div>
        <div className="home--review--example">
          <div className="home--review--courses">
            <MiniCourse name={"ANT102"} difficulty={"Difficulty: 3.6"} rating={"Rating: 6.5"}/>
            <MiniCourse name={"CSC148"} difficulty={"Difficulty: 6.6"} rating={"Rating: 5.3"}/>
            <MiniCourse name={"BIO152"} difficulty={"Difficulty: 5.6"} rating={"Rating: 3.4"}/>
          </div>
          <h3>View ratings on courses you plan to take!</h3>
        </div>
        <div className="home--review--anecdote">
          <h3>Post ratings that encourage students to take courses, or discourage them from wasting their time and money.</h3>
          <img src={review_anecdotes} alt="" />
        </div>
      <Footer />
    </div>
  )
}

export default Home
