import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseURL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL : process.env.REACT_APP_PROD;

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const register = async (username, email, program, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(baseURL + '/api/user/register', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({username, email, program, password})
        })
        
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save user to local storage
            localStorage.setItem("user", JSON.stringify(json))

            // update auth context
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false)
        }
    }

    return {register, isLoading, error}
}