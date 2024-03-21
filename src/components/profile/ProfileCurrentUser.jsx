import { Link } from "react-router-dom"
import "./Profile.css"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/userService"
import { getAllKits } from "../../services/kitService"


export const ProfileCurrentUser = ({ currentUser }) => {

    const [userProfileInfo, setUserProfileInfo] = useState({})
    const [usersKits, serUsersKits] = useState([])

    useEffect(() => {
        getAllUsers().then(userArray => {
            const user = userArray.find(user => user.id == currentUser.id)
            setUserProfileInfo(user)
        })
    }, [currentUser.id])

    useEffect(() => {
        getAllKits().then(kitsArray => {
            const userRelevantKits = kitsArray.filter(kit => kit.userId === currentUser.id)
            serUsersKits(userRelevantKits)
        })
    }, [currentUser.id])

    return <>
        
        <img src="src/images/stitcheslogo.png" alt="stitches logo"
            className="stitchesImage logo"/>
        <div className="profile-container">
            <h1>{userProfileInfo?.fullName}</h1>
            {userProfileInfo?.skillLevelId === 1 ?
                <h3>Skill Level: Beginner</h3> :
                (userProfileInfo?.skillLevelId === 2 ?
                    <h4>Skill Level: Intermediate</h4> :
                    <h4>Skill Level: Advanced</h4>)}
            <h4>Number of Kits: {usersKits.length}</h4>
        </div>
        <Link to={`/editProfile/${currentUser.id}`}>
            <button className="btn-primary">Edit Profile</button>
        </Link>
    </>

}
