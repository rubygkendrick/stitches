import { useEffect, useState } from "react"
import "../forms.css"
import { createNewKit, createNewKitStitch, getAllStitches } from "../../../services/kitService"
import { useNavigate} from "react-router-dom"

export const KitForm = ({ currentUser }) => {
    const [allStitches, setAllStitches] = useState([])
    const [newKitStitchIds, setNewKitStitchIds] = useState([])
    
    const navigate = useNavigate()

    const [kit, setKit] = useState({
        id: 1,
        title: "",
        description: "",
        pattern: "",
        color1: "",
        color2: "",
        color3: "",
        strandDominant: 0,
        strandSecondary: 0,
        strandTertiary: 0,
        userId: 0,
        notes: "",
        skillLevelId: 0,
        completedPhoto: ""
    })

    useEffect(() => {
        getAllStitches().then(stitchArray => {
            setAllStitches(stitchArray)
        })
    }, [])

    const handleNewKit = (event) => {
        event.preventDefault()
        if (newKitStitchIds.length !== 0 &&
            kit.title &&
            kit.description &&
            kit.pattern &&
            kit.color1 &&
            kit.strandDominant !== 0 &&
            kit.skillLevelId !== 0) {
            const newKit = {
                title: kit.title,
                description: kit.description,
                pattern: kit.pattern,
                color1: kit.color1,
                color2: kit.color2,
                color3: kit.color3,
                strandDominant: parseInt(kit.strandDominant),
                strandSecondary: parseInt(kit.strandSecondary),
                strandTertiary: parseInt(kit.strandTertiary),
                userId: parseInt(currentUser.id),
                notes: kit.notes,
                skillLevelId: parseInt(kit.skillLevelId),
                completedPhoto: ""

            }
            createNewKit(newKit).then(() => {
                handleNewKitStitches()
                navigate(`/kitDetails/${newKit.id}`)   
            })

        } else {
            window.alert(
                "New Kits must contain the following fields: title, description, one stitch, an image URL, one color, a dominant strand count, and skill level")
        }
    }

    const handleCheckBoxChange = (event) => {
        const value = event.target.value
        setNewKitStitchIds([...newKitStitchIds, value])

    }

    const handleNewKitStitches = () => {
        newKitStitchIds.forEach(stitchId => {
            const newKitStitch = {
                stitchId: parseInt(stitchId),
                kitId: kit.id
            };
            createNewKitStitch(newKitStitch);
        });
    };



    return (
        <div>
            <h1 className="logo">Create a Kit</h1>
            <form>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="title"
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.title = event.target.value
                                setKit(kitCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control-larger"
                            placeholder="brief description"
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.description = event.target.value
                                setKit(kitCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <legend>Colors:</legend>
                        <div className="form-group-color">
                            <input
                                type="text"
                                className="form-color"
                                placeholder="color"
                                onChange={(event) => {
                                    const kitCopy = { ...kit }
                                    kitCopy.color1 = event.target.value
                                    setKit(kitCopy)
                                }}
                            />
                            <input
                                type="text"
                                className="form-color"
                                placeholder="color"
                                onChange={(event) => {
                                    const kitCopy = { ...kit }
                                    kitCopy.color2 = event.target.value
                                    setKit(kitCopy)
                                }}
                            />  <input
                                type="text"
                                className="form-color"
                                placeholder="color"
                                onChange={(event) => {
                                    const kitCopy = { ...kit }
                                    kitCopy.color3 = event.target.value
                                    setKit(kitCopy)
                                }}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <legend>Stitches:</legend>
                        <div className="form-radio">
                            {allStitches.map(stitchObject => (
                                <label key={stitchObject.id}>
                                    <input className="radio"
                                        type="checkbox"
                                        value={stitchObject.id}
                                        onChange={handleCheckBoxChange}
                                    >
                                    </input>
                                    {stitchObject.type}
                                </label>
                            ))}
                        </div>

                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <legend>Strand Counts:</legend>
                        <div className="form-group-color">
                            <input
                                type="text"
                                className="form-color"
                                placeholder="domainant"
                                onChange={(event) => {
                                    const kitCopy = { ...kit }
                                    kitCopy.strandDominant = event.target.value
                                    setKit(kitCopy)
                                }}
                            />
                            <input
                                type="text"
                                className="form-color"
                                placeholder="secondary"
                                onChange={(event) => {
                                    const kitCopy = { ...kit }
                                    kitCopy.strandSecondary = event.target.value
                                    setKit(kitCopy)
                                }}
                            />  <input
                                type="text"
                                className="form-color"
                                placeholder="tertiary"
                                onChange={(event) => {
                                    const kitCopy = { ...kit }
                                    kitCopy.strandTertiary = event.target.value
                                    setKit(kitCopy)
                                }}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="form-control dropdown" defaultValue="0"
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.skillLevelId = event.target.value
                                setKit(kitCopy)
                            }}  >
                            <option value="0" disabled >Skill Level</option>
                            <option value={1}>Beginner</option>
                            <option value={2}>Intermediate</option>
                            <option value={3}>Advanced</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control-larger"
                            placeholder="notes"
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.notes = event.target.value
                                setKit(kitCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="photoInput"
                            placeholder="image URL"
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.pattern = event.target.value
                                setKit(kitCopy)
                            }}
                        />
                    </div>
                </fieldset>
            </form>
            <div className="form-group">
                <button className="form-btn btn-primary"
                    onClick={handleNewKit}
                >Save</button>
            </div>
        </div>
    )
}