import React, { useState } from 'react'
import '../App.css'
import ReviewForm from './algorithmComponents/ReviewForm'
import ReviewSection from './algorithmComponents/ReviewSection'
import DifficultyBarChart from "./algorithmComponents/DifficultyBarChart"
import RatingBarChart from "./algorithmComponents/RatingBarChart"
import { useEffect } from 'react'
const baseURL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL : process.env.REACT_APP_PROD;


export default function CoursePage(props) {
    const {course} = props

      // finding difficulties
  const initialDifficulties = [
    { label: 1, value: 0 },
    { label: 2, value: 0 },
    { label: 3, value: 0 },
    { label: 4, value: 0 },
    { label: 5, value: 0 },
    { label: 6, value: 0 },
    { label: 7, value: 0 },
    { label: 8, value: 0 },
    { label: 9, value: 0 },
    { label: 10, value: 0 },
  ];

  const initialRatings = [
    { label: 1, value: 0 },
    { label: 2, value: 0 },
    { label: 3, value: 0 },
    { label: 4, value: 0 },
    { label: 5, value: 0 },
    { label: 6, value: 0 },
    { label: 7, value: 0 },
    { label: 8, value: 0 },
    { label: 9, value: 0 },
    { label: 10, value: 0 },
  ];

    // finding difficulties
    const [difficulties, setDifficulties] = useState([
      { label: 1, value: 0 },
      { label: 2, value: 0 },
      { label: 3, value: 0 },
      { label: 4, value: 0 },
      { label: 5, value: 0 },
      { label: 6, value: 0 },
      { label: 7, value: 0 },
      { label: 8, value: 0 },
      { label: 9, value: 0 },
      { label: 10, value: 0 },
    ])
    const [ratings, setRatings] = useState([
      { label: 1, value: 0 },
      { label: 2, value: 0 },
      { label: 3, value: 0 },
      { label: 4, value: 0 },
      { label: 5, value: 0 },
      { label: 6, value: 0 },
      { label: 7, value: 0 },
      { label: 8, value: 0 },
      { label: 9, value: 0 },
      { label: 10, value: 0 },
    ])
    
    // checking if courses are valid
    useEffect(() => {

      setDifficulties(initialDifficulties)
      setRatings(initialRatings)

      const fetchCourses = async () => {

        const response = await fetch(baseURL + '/api/reviews', {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
            }
        })

        const json = await response.json()
        console.log(json)  

        for (let i = 0; i < json.length; i++) {
          if (json[i].courseTitle === course.title) {
            const newDifficulties = [...difficulties]
            
            for (let j = 0; j < newDifficulties.length; j ++) {
              if (newDifficulties[j].label == json[i].difficulty) {
                newDifficulties[j].value += 1
              }
            }

            setDifficulties(newDifficulties)

            const newRatings = [...ratings]
            for (let j = 0; j < newRatings.length; j ++) {
              if (newRatings[j].label == json[i].rating) {
                newRatings[j].value += 1
              }
            } 

            setRatings(newRatings)
          }
        }
      }

      fetchCourses()

    }, [course.title])

    return (
        <div className="course-details">
          <div className="details">
            <h1>{course.title}</h1>
            <p>{course.distribution}</p>
          </div>
          <div className="review--graphs">
            <div className="difficulty--graph">
              <h4>Difficulty</h4>
              <DifficultyBarChart data={difficulties} width={400} height={300} />
            </div>
            <div className="rating--graph">
              <h4>Ratings</h4>
              <RatingBarChart data={ratings} width={400} height={300} />
            </div>
          </div>
          <ReviewForm course={course}/>
          <br />
          <ReviewSection course={course}/>
        </div>
        
      )
}