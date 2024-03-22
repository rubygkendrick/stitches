import "./forms.css"

export const SkillLevelInputForForm = ({currentKit , kit , setKit, setCurrentKit}) => {

    return(
        <fieldset>
                    <div className="form-group">
                    <select className="form-control dropdown"
                            value={currentKit?.skillLevelId ? currentKit.skillLevelId : kit.skillLevelId} selected
                            onChange={(event) => {
                                if (currentKit) {
                                    const currentKitCopy = { ...currentKit }
                                    currentKitCopy.skillLevelId = event.target.value
                                    setCurrentKit(currentKitCopy)
                                } else {
                                    const kitCopy = { ...kit }
                                    kitCopy.skillLevelId = event.target.value
                                    setKit(kitCopy)
                                }

                            }}  >
                            {currentKit ? (
                                <option value={0} disabled>Skill Level</option>
                            ) : (
                                <option value="" disabled >Skill Level</option>
                            )}

                            <option value={1}>Beginner</option>
                            <option value={2}>Intermediate</option>
                            <option value={3}>Advanced</option>
                        </select>
                    </div>
                </fieldset>
    )
}