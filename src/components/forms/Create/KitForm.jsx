import { useEffect, useState } from "react"
import "../forms.css"
import { createNewKit, createNewKitStitch, editKit, editKitStitch, getAllStitches, getKitByKitId } from "../../../services/kitService"
import { useNavigate, useParams } from "react-router-dom"

export const KitForm = ({ currentUser }) => {
    const navigate = useNavigate()
    const { kitId } = useParams()
    const [allStitches, setAllStitches] = useState([])
    const [newKitStitchIds, setNewKitStitchIds] = useState([])
    const [currentKitStitchIds, setCurrentKitStitchIds] = useState([])
    const [currentKit, setCurrentKit] = useState({})
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
        getKitByKitId(parseInt(kitId)).then(kitArray =>
            setCurrentKit(kitArray[0])
        )
    }, [kitId])


    useEffect(() => {
        getAllStitches().then(stitchArray => {
            setAllStitches(stitchArray)
        })
    }, [])

    useEffect(() => {
        if (currentKit) {
            const updatedKitStitchIds = currentKit?.kitStitches?.map(kitStitch => kitStitch.stitchId)
            setCurrentKitStitchIds(updatedKitStitchIds);
        }
    }, [currentKit])



const handleSave = (event) => {
    event.preventDefault()

    if (
        newKitStitchIds.length !== 0 &&
        kit.title &&
        kit.description &&
        kit.pattern &&
        kit.color1 &&
        kit.strandDominant !== 0 &&
        kit.skillLevelId !== 0
    ) {
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
            completedPhoto: kit.completedPhoto
        }
        const existingKit = {
            title: currentKit.title,
            description: currentKit.description,
            pattern: currentKit.pattern,
            color1: currentKit.color1,
            color2: currentKit.color2,
            color3: currentKit.color3,
            strandDominant: parseInt(currentKit.strandDominant),
            strandSecondary: parseInt(currentKit.strandSecondary),
            strandTertiary: parseInt(currentKit.strandTertiary),
            userId: parseInt(currentUser.id),
            notes: currentKit.notes,
            skillLevelId: parseInt(currentKit.skillLevelId),
            completedPhoto: currentKit.completedPhoto
        }

        if (currentKit) {
            editKit(existingKit, currentKit.id)
                .then((editedKit) => {
                    newKitStitchIds.forEach((stitchId) => {
                        const editedKitStitch = {
                            stitchId: parseInt(stitchId),
                            kitId: editedKit.id
                        };
                        editKitStitch(editedKitStitch, currentKit.id); //this needs also a PUT request function 
                    })
                    navigate("/myKits");
                })
        } else {
            createNewKit(newKit)
                .then((createdKit) => {
                    const newKitId = createdKit.id;
                    console.log(createdKit);
                    newKitStitchIds.forEach((stitchId) => {
                        const newKitStitch = {
                            stitchId: parseInt(stitchId),
                            kitId: newKitId
                        };
                        createNewKitStitch(newKitStitch);
                    })
                    navigate("/myKits")
                })
        }
    } else {
        window.alert(
            "New Kits must contain the following fields: title, description, one stitch, an image URL, one color, a dominant strand count, and skill level"
        )
    }
}

const handleCheckBoxChange = (event) => {
    const value = parseInt(event.target.value)
    const isChecked = event.target.checked;
    if (!currentKitStitchIds) {
        // If there is no currentKitStitch, handle the checkbox change as usual
        if (isChecked) {
            setNewKitStitchIds([...newKitStitchIds, value])
        } else {
            setNewKitStitchIds(newKitStitchIds.filter(id => id != value))
        }
    } else {
        if (isChecked) {
            setCurrentKitStitchIds([...currentKitStitchIds, value])
        } else {
            setCurrentKitStitchIds(currentKitStitchIds.filter(id => id != value))
        }
        
             
    }
}




return (
    <div>
        {currentKit ? "" : <h1 className="logo">Create a Kit</h1>}

        <form>
            <fieldset>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={currentKit ? currentKit.title : ""}
                        placeholder={currentKit?.title || "title"}
                        onChange={(event) => {
                            if (currentKit) {
                                const currentKitCopy = { ...currentKit }
                                currentKitCopy.title = event.target.value
                                setCurrentKit(currentKitCopy)
                            } else {
                                const kitCopy = { ...kit }
                                kitCopy.title = event.target.value
                                setKit(kitCopy)
                            }
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control-larger"
                        value={currentKit?.description || ""}
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
                            value={currentKit?.color1 || ""}
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
                            value={currentKit?.color2 || ""}
                            placeholder="color"
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.color2 = event.target.value
                                setKit(kitCopy)
                            }}
                        />  <input
                            type="text"
                            className="form-color"
                            value={currentKit?.color3 || ""}
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
                                    checked={
                                        currentKitStitchIds &&
                                        currentKitStitchIds.includes(stitchObject.id)
                                    }
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
                            value={currentKit?.strandDominant || ""}
                            placeholder="dominant"
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.strandDominant = event.target.value
                                setKit(kitCopy)
                            }}
                        />
                        <input
                            type="text"
                            className="form-color"
                            value={currentKit ? currentKit.strandSecondary : ""}
                            placeholder="secondary"
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.strandSecondary = event.target.value
                                setKit(kitCopy)
                            }}
                        />  <input
                            type="text"
                            className="form-color"
                            value={currentKit?.strandTertiary || ""}
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
                    <select className="form-control dropdown"
                        defaultValue={currentKit ? currentKit.skillLevelId : ""}
                        onChange={(event) => {
                            const kitCopy = { ...kit }
                            kitCopy.skillLevelId = event.target.value
                            setKit(kitCopy)
                        }}  >
                        {currentKit ? (
                            <option value="" disabled>Skill Level</option>
                        ) : (
                            <option value="" selected>Skill Level</option>
                        )}

                        <option value={1}>Beginner</option>
                        <option value={2}>Intermediate</option>
                        <option value={3}>Advanced</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control-larger"
                        value={currentKit?.notes || ""}
                        placeholder={"notes"}
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
                    <textarea
                        type="text"
                        className="photoInput"
                        value={currentKit?.pattern || "image URL"}
                        placeholder=""
                        onChange={(event) => {
                            const kitCopy = { ...kit }
                            kitCopy.pattern = event.target.value
                            setKit(kitCopy)
                        }}
                    />
                </div>
                <fieldset>
                    <div className="form-group">
                        <textarea
                            type="text"
                            className="photoInput"
                            value={currentKit?.completedPhoto || "image URL"}
                            placeholder=""
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.completedPhoto = event.target.value
                                setKit(kitCopy)
                            }}
                        />
                    </div>
                </fieldset>
            </fieldset>
        </form>
        <div className="form-group">
            <button className="form-btn btn-primary"
                onClick={handleSave}
            >Save</button>
        </div>
        {currentKit ? (
            <div className="form-group">
                <button className="form-btn-main btn-primary"
                >Delete Kit</button>
            </div>
        ) : (
            ""
        )}
    </div>
)
}