const handleSave = (event) => {
    event.preventDefault()
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
    } else if (!currentKit){
        createNewKit(newKit).then((createdKit) => {
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
    } else {
        window.alert(
            "New Kits must contain the following fields: title, description, one stitch, an image URL, one color, a dominant strand count, and skill level"
        )
    }
}