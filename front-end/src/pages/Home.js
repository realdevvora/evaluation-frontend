import { useEffect, useState } from "react"
const baseURL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL : process.env.REACT_APP_PROD;

const Home = () => {
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(baseURL + "/api/courses")
            const json = await response.json()

            if (response.ok) {
                setCourses(json)
            }
        }

        fetchCourses()
    }, [])

    return (
        <div className="home">
            <div className="courses">
                {courses && courses.map((course) => (<p key={course._id}>{course.title}</p>))}
            </div>
        </div>
    )
}

export default Home