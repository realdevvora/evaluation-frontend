import { useEffect, useState } from "react"
import { useReviewContext } from "../../hooks/useReviewContext"
import { useAuthContext } from "../../hooks/useAuthContext"
const baseURL = "https://course-evaluations-api.onrender.com"

const ReviewSection = (props) => {
    const {course} = props
    const {reviews, dispatch} = useReviewContext()
    const {user} = useAuthContext()

    useEffect(() => {
        // sending
        const fetchReviews = async () => {
            const response = await fetch(baseURL + "/api/reviews")
            const json = await response.json()

            
            const listReviews = []
            if (response.ok) {
                for (const key in json) {
                    if (json[key].courseTitle === course.title) {
                        listReviews.push(json[key])
                    }
                    
                }

                dispatch({type: "SET_REVIEWS", payload: listReviews})
            }
        }

        
        fetchReviews()
    }, [course, user])



    return (
        <div className="review--block">
        {reviews ? (
            reviews.map(review => (
                <div className="search--box--review" key={review._id} onClick={() => {}}>
                    <div className="review--block--header">
                        <h3>{review.title}</h3>
                        <p>by: {review.author} in {review.program}</p>
                    </div>
                    <p>{review.message}</p>
                    <div className="review--block--ratings">
                        <h4>Rating: {review.rating}/10</h4>
                        <h4>Difficulty: {review.difficulty}/10</h4>
                    </div>
                    <span onClick={async () => {

                        const response = await fetch(baseURL + "/api/reviews/" + review._id, {
                            method: "DELETE"
                        })
                        const json = await response.json()

                        if (response.ok) {
                            console.log(json)
                        }
                    }}><strong>Delete</strong></span>
                </div>
            ))
        ) : (
            <p>Loading reviews...</p>
        )}
    </div>
    )

}

export default ReviewSection