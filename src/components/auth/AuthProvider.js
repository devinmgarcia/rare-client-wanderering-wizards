import React, { useState } from "react"

export const ProfileContext = React.createContext()
const api = "https://rare-serverer.herokuapp.com"

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({events:[]})

    const getProfile = () => {
        return fetch(`${api}/profile`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setProfile)
    }

    return (
        <ProfileContext.Provider value={{
            profile, getProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}
