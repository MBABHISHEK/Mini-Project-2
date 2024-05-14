const path = require("path")
const fs = require("fs")

const deleteImageFile = (req, deleteImage) => {
    const rootDir = path.dirname(require.main.filename)
    filepath = path.join( rootDir,`/public/storyImages/${deleteImage}`)
    fs.unlink(filepath, (res) => console.log(res, "file deleted"))
}

module.exports = deleteImageFile