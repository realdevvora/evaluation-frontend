import React from 'react'
import '../App.css'
import Footer from './Footer'
import review_anecdotes from "../images/review_anecdotes.png"
import MiniCourse from './homepage/MiniCourse'

function Home() {

  return (
    <div className="home--page">
      <div className="home--hero">
        <h3>honest opinions of your fellow peers.</h3>
      </div>
        <div className="home--review--example">
        <h3>View ratings on courses you plan to take!</h3>
          <div className="home--review--courses">
            <MiniCourse name={"ANT102"} description={"Anthropology is the global and holistic study of human biology and behaviour, and includes four subfields: biological anthropology, archaeology, sociocultural anthropology and linguistic anthropology. The material covered is directed to answering the question..."}/>
            <MiniCourse name={"CSC148"} description={"The scientific method and the modern theory of evolution as an introduction to biology. The principles of evolution, transmission and evolutionary genetics are developed in lectures and laboratories."}/>
            <MiniCourse name={"BIO152"} description={"Abstract data types and data structures for implementing them. Linked data structures. Encapsulation and information-hiding. Object-oriented programming. Specifications. Analyzing the efficiency of programs. Recursion. This course assumes programming..."}/>
          </div>
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
