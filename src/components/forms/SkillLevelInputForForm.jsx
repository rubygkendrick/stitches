import "./forms.css"
export const SkillLevelInputForForm = ({currentKit , kit , setKit}) => {

    return(
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
    )
}