import "./forms.css"

export const DescriptionInputForForm = ({ currentKit, kit, setKit, setCurrentKit }) => {
    return (
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
    )

}