import { useEffect, useState } from "react"
import "./Kits.css"
import { getAllKits } from "../../services/kitService"
import { Link } from "react-router-dom"

export const AllKits = ({ currentUser }) => {

    const [allKits, setAllKits] = useState([])


    const getAndResetAllKits = () => {
        getAllKits().then(kitsArray => {
            setAllKits(kitsArray)
        })
    }

    useEffect(() => {
        getAndResetAllKits()
    }, [])


    return (
        <div className="kitsMain-container">
            {allKits.map((kit) => (
                <div key={kit.id} className="kit-container">
                    <Link to={`/kitDetails/${kit.id}`}>
                        <h2 className="kit-title">{kit.title}</h2>
                    </Link>

                    {kit.completedPhoto ? (
                        <img
                            className="kit-image"
                            src={kit.completedPhoto}
                            alt="completed photo"
                        />
                    ) : (
                        <img
                            className="kit-image"
                            src={kit.pattern}
                            alt="pattern photo"
                        />
                    )}
                    <p>Level: {kit.skillLevel.level}</p>
                </div>
            ))}
        </div>
    )
}