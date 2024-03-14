import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewKitFavorite, getAllStitches, getKitByKitId } from "../../services/kitService";
import "./KitDetails.css"

export const KitDetails = ({ currentUser }) => {
    const { kitId } = useParams()
    const [kit, setKit] = useState({})
    const [allStitches, setAllStitches] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        getAllStitches().then(stitchArray => {
            setAllStitches(stitchArray)
        })
    }, [])

    useEffect(() => {
        getKitByKitId(parseInt(kitId)).then(kitArray =>
            setKit(kitArray[0])

        )
    }, [kitId])
   
    const handleEditClick = () => {
        navigate(`/editKit/${kit.id}`)
    }

    const handleFavoritesClick = () => {
        const newFavorite = {
            userId: currentUser.id,
            kitId: kit.id
        }
        createNewKitFavorite(newFavorite).then(() => {
            navigate("/favorites")
        })

    }

    return (
        <>
            <div className="detail-container">
                <h2>{kit.title}</h2>
                <h3>Level: {kit.skillLevel?.level}</h3>
                {kit.completedPhoto ? (
                    <img
                        className="detail-image"
                        src={kit.completedPhoto}
                        alt="completed photo"
                    />
                ) : null}
                <img className="detail-image"
                    src={kit.pattern}
                    alt="pattern photo"
                ></img>
                <h3>Description:</h3>
                <p>{kit.description}</p>
                <h3>Colors:</h3>
                <p>{kit.color1}, {kit.color2} , {kit.color3}</p>
                <h3>Stitches:</h3>
                <div>
                    {kit.kitStitches?.map((kitStitch) => {
                        const correspondingStitch =
                            allStitches.find(stitch => stitch.id === kitStitch.stitchId)

                        return <p key={kitStitch.id}>
                            {correspondingStitch ? correspondingStitch.type : "Unknown Stitch"}
                        </p>;
                    })}
                </div>
                <h3>Strand Counts:</h3>
                <p>{kit.strandDominant}, {kit.strandSecondary} , {kit.strandTertiary}</p>
                <h3>Notes:</h3>
                <p>{kit.notes}</p>
            </div>
            {currentUser.id == kit.userId ? (
                <button className="btn-primary detail-btn"
                    onClick={handleEditClick}
                >Edit</button>
            ) : <button className="btn-primary detail-btn"
                onClick={handleFavoritesClick}
            >Add to Favorites</button>}
        </>
    )

}
