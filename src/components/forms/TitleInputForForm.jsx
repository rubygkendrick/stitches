import "./forms.css"

export const TitleInputForForm = ({currentKit, setCurrentKit, kit, setKit}) => {
    return (
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
    )

}