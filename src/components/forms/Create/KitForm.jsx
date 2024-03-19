import { useEffect, useState } from "react"
import "../forms.css"
import { createNewKit, createNewKitStitch, deleteKit, deleteKitStitch, editKit, getAllKitStitches, getAllStitches, getKitByKitId } from "../../../services/kitService"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export const KitForm = ({ currentUser }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const { kitId } = useParams()
    const [allStitches, setAllStitches] = useState([])
    const [newKitStitchIds, setNewKitStitchIds] = useState([])
    const [currentKitStitchIds, setCurrentKitStitchIds] = useState([])
    const [currentKit, setCurrentKit] = useState({})
    const [allKitStitches, setAllKitStitches] = useState([])
    const [previousKitStitches, setPreviousStitches] = useState([])


    const [kit, setKit] = useState({
        id: 0,
        title: "",
        description: "",
        pattern: "",
        color1: "",
        color2: "",
        color3: "",
        strandDominant: "",
        strandSecondary: "",
        strandTertiary: "",
        userId: 0,
        notes: "",
        skillLevelId: "",
        completedPhoto: ""
    })



    useEffect(() => {

        getKitByKitId(parseInt(kitId)).then(kitArray =>
            setCurrentKit(kitArray[0])
        )

    }, [kitId])


    useEffect(() => {
        getAllKitStitches().then(kitStitchesArray => {
            setAllKitStitches(kitStitchesArray)
        })
    }, [])

    useEffect(() => {
        getAllStitches().then(stitchArray => {
            setAllStitches(stitchArray)
        })
    }, [])

    useEffect(() => {
        if (currentKit) {
            const updatedKitStitchIds = currentKit?.kitStitches?.map(kitStitch => kitStitch.stitchId)
            setCurrentKitStitchIds(updatedKitStitchIds)
            setPreviousStitches(updatedKitStitchIds)
        } else {
            setCurrentKitStitchIds([])
            setPreviousStitches([])
        }
    }, [currentKit])



    const handleSave = (event) => {
        event.preventDefault()

        if (currentKit) {
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
                userId: currentKit.userId,
                notes: currentKit.notes,
                skillLevelId: parseInt(currentKit.skillLevelId),
                completedPhoto: currentKit.completedPhoto
            }
            editKit(existingKit, currentKit.id)

            allStitches.map(stitch => {
                if (previousKitStitches.find(kitStitch => kitStitch == stitch.id) &&
                    !currentKitStitchIds.find(kitStitch => kitStitch == stitch.id)) {
                    const kitStitchToDelete = allKitStitches.find(kitStitch =>
                        kitStitch.kitId == currentKit.id && kitStitch.stitchId == stitch.id)
                    deleteKitStitch(kitStitchToDelete.id)
                }
                if (!previousKitStitches.find(kitStitch => kitStitch == stitch.id) &&
                    currentKitStitchIds.find(kitStitch => kitStitch == stitch.id)) {
                    const editedKitStitch = {
                        stitchId: parseInt(stitch.id),
                        kitId: currentKit.id
                    }

                    createNewKitStitch(editedKitStitch)
                }
            }

            )
            navigate("/myKits")

        } else if (!currentKit) {
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
            createNewKit(newKit).then((createdKit) => {
                const newKitId = createdKit.id;

                newKitStitchIds.forEach((stitchId) => {
                    const newKitStitch = {
                        stitchId: parseInt(stitchId),
                        kitId: newKitId
                    }
                    createNewKitStitch(newKitStitch).then(
                        navigate("/myKits")
                    )
                })
                
            })
        } else {
            window.alert(
                "New Kits must contain the following fields: title, description, one stitch, an image URL, one color, a dominant strand count, and skill level"
            )
        }
    }


    const handleCheckBoxChange = (event) => {
        const value = parseInt(event.target.value)
        const isChecked = event.target.checked
        if (!currentKit) {
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


    const handleKitDelete = () => {

        const kitStitchesToDelete = allKitStitches.filter(kitStitch =>
            kitStitch.kitId == currentKit.id)
        kitStitchesToDelete.forEach(stitch => {

            deleteKitStitch(stitch.id)
        })

        deleteKit(currentKit.id)
        navigate("/myKits")
    }



    return (
        <div>
            {currentKit ? "" : <h1 className="logo">Create a Kit</h1>}

            <form >
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            required
                            defaultValue={currentKit?.title ? currentKit.title : undefined}
                            placeholder={currentKit?.title ? currentKit.title : "title"}

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
                            required
                            defaultValue={currentKit?.description ? currentKit.description : ""}
                            placeholder={currentKit?.description ? currentKit.description : "brief description"}

                            onChange={(event) => {
                                if (currentKit) {
                                    const currentKitCopy = { ...currentKit }
                                    currentKitCopy.description = event.target.value
                                    setCurrentKit(currentKitCopy)
                                } else {
                                    const kitCopy = { ...kit }
                                    kitCopy.description = event.target.value
                                    setKit(kitCopy)
                                }
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
                                required
                                defaultValue={currentKit?.color1 ? currentKit.color1 : undefined}
                                placeholder={currentKit?.color1 ? currentKit.color1 : "color"}
                                onChange={(event) => {
                                    if (currentKit) {
                                        const currentKitCopy = { ...currentKit }
                                        currentKitCopy.color1 = event.target.value
                                        setCurrentKit(currentKitCopy)
                                    } else {
                                        const kitCopy = { ...kit }
                                        kitCopy.color1 = event.target.value
                                        setKit(kitCopy)
                                    }
                                }}
                            />
                            <input
                                type="text"
                                className="form-color"
                                defaultValue={currentKit?.color2 ? currentKit.color2 : undefined}
                                placeholder={currentKit?.color2 ? currentKit.color2 : "color"}
                                onChange={(event) => {
                                    if (currentKit) {
                                        const currentKitCopy = { ...currentKit }
                                        currentKitCopy.color2 = event.target.value
                                        setCurrentKit(currentKitCopy)
                                    } else {
                                        const kitCopy = { ...kit }
                                        kitCopy.color2 = event.target.value
                                        setKit(kitCopy)
                                    }
                                }}
                            />
                            <input
                                type="text"
                                className="form-color"
                                defaultValue={currentKit?.color3 ? currentKit.color3 : undefined}
                                placeholder={currentKit?.color3 ? currentKit.color3 : "color"}
                                onChange={(event) => {
                                    if (currentKit) {
                                        const currentKitCopy = { ...currentKit }
                                        currentKitCopy.color3 = event.target.value
                                        setCurrentKit(currentKitCopy)
                                    } else {
                                        const kitCopy = { ...kit }
                                        kitCopy.color3 = event.target.value
                                        setKit(kitCopy)
                                    }
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
                                <label key={stitchObject.id} >
                                    <input className="radio"
                                        type="checkbox"
                                        value={stitchObject.id}
                                        defaultChecked={
                                            currentKit ? currentKitStitchIds?.includes(stitchObject.id) : false
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
                                defaultValue={currentKit?.strandDominant ? currentKit.strandDominant : undefined}
                                placeholder={currentKit?.strandDominant ? currentKit.strandDominant : "dominant"}
                                onChange={(event) => {
                                    if (currentKit) {
                                        const currentKitCopy = { ...currentKit }
                                        currentKitCopy.strandDominant = event.target.value
                                        setCurrentKit(currentKitCopy)
                                    } else {
                                        const kitCopy = { ...kit }
                                        kitCopy.strandDominant = event.target.value
                                        setKit(kitCopy)
                                    }
                                }}
                            />
                            <input
                                type="text"
                                className="form-color"
                                defaultValue={currentKit?.strandSecondary ? currentKit.strandSecondary : undefined}
                                placeholder={currentKit?.strandSecondary ? currentKit.strandSecondary : "secondary"}
                                onChange={(event) => {
                                    if (currentKit) {
                                        const currentKitCopy = { ...currentKit }
                                        currentKitCopy.strandSecondary = event.target.value
                                        setCurrentKit(currentKitCopy)
                                    } else {
                                        const kitCopy = { ...kit }
                                        kitCopy.strandSecondary = event.target.value
                                        setKit(kitCopy)
                                    }
                                }}
                            />
                            <input
                                type="text"
                                className="form-color"
                                defaultValue={currentKit?.strandTertiary ? currentKit.strandTertiary : undefined}
                                placeholder={currentKit?.strandTertiary ? currentKit.strandTertiary : "tertiary"}
                                onChange={(event) => {
                                    if (currentKit) {
                                        const currentKitCopy = { ...currentKit }
                                        currentKitCopy.strandTertiary = event.target.value
                                        setCurrentKit(currentKitCopy)
                                    } else {
                                        const kitCopy = { ...kit }
                                        kitCopy.strandTertiary = event.target.value
                                        setKit(kitCopy)
                                    }
                                }}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="form-control dropdown"
                            defaultValue={currentKit?.skillLevelId ? currentKit.skillLevelId : undefined}
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
                            defaultValue={currentKit?.notes ? currentKit.notes : ""}
                            placeholder={currentKit?.notes ? currentKit.notes : "notes"}
                            onChange={(event) => {
                                if (currentKit) {
                                    const currentKitCopy = { ...currentKit }
                                    currentKitCopy.notes = event.target.value
                                    setCurrentKit(currentKitCopy)
                                } else {
                                    const kitCopy = { ...kit }
                                    kitCopy.notes = event.target.value
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
                            className="photoInput"
                            defaultValue={currentKit?.pattern ? currentKit.pattern : ""}
                            placeholder={currentKit?.pattern ? currentKit.pattern : "pattern image URL"}
                            onChange={(event) => {
                                if (currentKit) {
                                    const currentKitCopy = { ...currentKit }
                                    currentKitCopy.pattern = event.target.value
                                    setCurrentKit(currentKitCopy)
                                } else {
                                    const kitCopy = { ...kit }
                                    kitCopy.pattern = event.target.value
                                    setKit(kitCopy)
                                }
                            }}
                        />
                    </div>
                    <fieldset>
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="photoInput"
                                defaultValue={currentKit?.completedPhoto ? currentKit.completedPhoto : ""}
                                placeholder={currentKit?.completedPhoto ? currentKit.completedPhoto : "completed image URL"}
                                onChange={(event) => {
                                    if (currentKit) {
                                        const currentKitCopy = { ...currentKit }
                                        currentKitCopy.completedPhoto = event.target.value
                                        setCurrentKit(currentKitCopy)
                                    } else {
                                        const kitCopy = { ...kit }
                                        kitCopy.completedPhoto = event.target.value
                                        setKit(kitCopy)
                                    }
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
                        onClick={handleKitDelete}
                    >Delete Kit</button>
                </div>
            ) : (
                ""
            )}
        </div>
    )
}