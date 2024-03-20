import { Link, useNavigate, useParams } from "react-router-dom"
import { editUser, getAllUsers } from "../../services/userService"
import "./Profile.css"
import { useEffect, useState } from "react"

export const EditProfile = ({ currentUser }) => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [userProfileInfo, setUserProfileInfo] = useState({})

    useEffect(() => {
        getAllUsers().then(userArray => {
            const user = userArray.find(user => user.id == userId)
            setUserProfileInfo(user)
        })
    }, [currentUser.id, userId])

    const handleProfileSave = () => {
        const updatedUser = {
            fullName: userProfileInfo.fullName,
            email: userProfileInfo.email,
            skillLevelId: parseInt(userProfileInfo.skillLevelId)
        }
        editUser(updatedUser, userId)
        navigate("/profile")
    }


    if (currentUser.id == userId) {

        return <>
            <h1 className="logo">Stitches</h1>
            <div className="profile-container">
                <input className="profile-input"
                    
                    placeholder={userProfileInfo?.fullName}
                    onChange={(event) => {
                        const editedProfileInfoCopy = { ...userProfileInfo }
                        editedProfileInfoCopy.fullName = event.target.value
                        setUserProfileInfo(editedProfileInfoCopy)
                    }}
                ></input>
                <input className="profile-input"
                    placeholder={userProfileInfo?.email}
                    
                    onChange={(event) => {
                        const editedProfileInfoCopy = { ...userProfileInfo }
                        editedProfileInfoCopy.email = event.target.value
                        setUserProfileInfo(editedProfileInfoCopy)
                    }}></input>

                <select className="profile-input" value={userProfileInfo.skillLevelId} selected
                    
                    onChange={(event) => {
                        const editedProfileInfoCopy = { ...userProfileInfo }
                        editedProfileInfoCopy.skillLevelId = event.target.value
                        setUserProfileInfo(editedProfileInfoCopy)
                    }}
                >
                    <option value={0} disabled >Skill Level</option>
                    <option value={1}>Beginner</option>
                    <option value={2}>Intermediate</option>
                    <option value={3}>Advanced</option>
                </select>

            </div>
            <Link to="/Profile">
                <button className="btn-primary"
                onClick={handleProfileSave}
                >Save</button>
            </Link>
        </>

    } else {
        return <h1>This is not your profile page! </h1>
    }
}
