import { useEffect, useState } from "react"
import "../forms.css"
import { createNewKit, createNewKitStitch, getAllStitches, getKitByKitId } from "../../../services/kitService"
import { useNavigate, useParams } from "react-router-dom"

export const KitForm = ({ currentUser }) => {
    const navigate = useNavigate()
    const {kitId} = useParams()
    const [allStitches, setAllStitches] = useState([])
    const [newKitStitchIds, setNewKitStitchIds] = useState([])
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

            createNewKit(newKit).then((createdKit) => {
                const newKitId = createdKit.id
                console.log(createdKit)
                newKitStitchIds.forEach(stitchId => {
                    const newKitStitch = {
                        stitchId: parseInt(stitchId),
                        kitId: newKitId
                    }
                    createNewKitStitch(newKitStitch)
                })
                navigate("/myKits")   ///this is a disaster
            })

        } else {
            window.alert(
                "New Kits must contain the following fields: title, description, one stitch, an image URL, one color, a dominant strand count, and skill level")
        }
    }

    const handleCheckBoxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setNewKitStitchIds([...newKitStitchIds, value])
        } else {
            setNewKitStitchIds(newKitStitchIds.filter(id => id !== value))
        }
    }

    return ( 
        <div>
            {currentKit? "" : <h1 className="logo">Create a Kit</h1>}
            
            <form>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            value= {currentKit?.title || ""}
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
                        <textarea
                            type="text"
                            className="form-control-larger"
                            value= {currentKit?.description || ""}
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
                                value= {currentKit?.color1 || ""}
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
                                value={currentKit?.strandSecondary || ""}
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
                        <select className="form-control dropdown" defaultValue={"0"}
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.skillLevelId = event.target.value
                                setKit(kitCopy)
                            }}  >
                            <option value={0} disabled >{currentKit?.skillLevel?.level || "Skill Level" }</option> 
                            <option value={currentKit?.skillLevelId || 1}>Beginner</option>
                            <option value={currentKit?.skillLevelId || 2}>Intermediate</option>
                            <option value={currentKit?.skillLevelId || 3}>Advanced</option>
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