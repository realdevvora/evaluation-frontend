import { useState } from "react"
import { useReviewContext } from "../../hooks/useReviewContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const baseURL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL : process.env.REACT_APP_PROD;
console.log(baseURL)

const ReviewForm = (props) => {
    const { dispatch } = useReviewContext()
    const {user} = useAuthContext()

    const {course} = props
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("timmy") // TODO
    const [message, setMessage] = useState("")
    const [program, setProgram] = useState("Computer Science") // TODO
    const [rating, setRating] = useState(0)
    const [difficulty, setDifficulty] = useState(0)
    const [courseTitle, setCourseTitle] = useState(course.title)
    const [error, setError] = useState(null)
    

    

    const handleSubmit = async (e) => {
        console.log(title)
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return 
        }
        console.log(user)
        setAuthor(user.username)
        setProgram(user.program)
        
        const review = {title, author: user.username, message, program: user.program, rating, difficulty, courseTitle}

        const response = await fetch(baseURL + '/api/reviews', {
            method: "POST",
            body: JSON.stringify(review),
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setTitle("")
            setMessage("")
            setRating("")
            setDifficulty("")
            setError(null)
            console.log("new review added")
            dispatch({type: "CREATE_REVIEW", payload: json})
        }
    }

    return (
        <div className="review--form">
                <form className="create" onSubmit={handleSubmit}>
                <h3>Add a new review for {course.title}</h3>

                <label>Title: </label>
                <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />

                <label>Message: </label>
                <input 
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message} />

                <label>Difficulty (1-10): </label>
                <input 
                    type="number"
                    onChange={(e) => setDifficulty(e.target.value)}
                    min="1"
                    max="10"
                    value={difficulty} />
                <label>Rating (1-10): </label>
                <input 
                    type="number"
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="10"
                    value={rating} />
                
                <button>Create Review!</button>
            </form>

            {error && <div className="error">{error}</div>}
        </div>
    )

}

export default ReviewForm