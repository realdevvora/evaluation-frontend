import React, { useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"

const baseURL = "https://course-evaluations-api.onrender.com"

export default function Searchbar() {
    
    const navigate = useNavigate()
    const [courses, setCourses] = useState(null)
    const [filteredCourses, setFilteredCourses] = useState(courses)
    const [showDropdown, setShowDropdown] = useState(false)
    const [searchInput, setSearchInput] = useState("")


    function handleChange(e) {
        e.preventDefault()
        setShowDropdown(true)
        setSearchInput(e.target.value)
    }

    // fetching for course data
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(baseURL + "/api/courses")
            const json = await response.json()
            
            console.log(response.ok)
            const listCourses = []
            if (response.ok) {
                for (const key in json) {
                    listCourses.push(json[key])
                }
                setCourses(listCourses)
            }
        }

        fetchCourses()
    }, [])

    // filtering searchbar based on course provided
    useEffect(() => {
        try {
            if (searchInput.length > 0 && courses) { // Check if 'courses' is not null
                if (courses.length > 0) {
                    setFilteredCourses(courses.filter(course => course.title.toLowerCase().includes(searchInput.toLowerCase())))
                }
            } else {
                setFilteredCourses(courses)
                setShowDropdown(false)
            }
        } catch (err) {
            console.log(err)
        }
    }, [searchInput, courses])
    
    

    return (
        <div className="search--bar">
            <input
                type="text"
                placeholder="Search Course"
                onChange={handleChange}
                value={searchInput}
                className="search--box"
            />

            {showDropdown && <div className="dropdown">
                {filteredCourses.map(course => {
                    return (
                        <div className="search--box--course" key={course._id} onClick={() => {
                            setSearchInput("")
                            navigate(`/${course.title}`)
                        }}>
                            <p>{course.title}</p>
                        </div>
                    )
                })}
            </div>}
        </div>
        
        
    )
}