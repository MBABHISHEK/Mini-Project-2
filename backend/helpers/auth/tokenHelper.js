const isTokenIncluded = (req) => {
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    )
}

const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.authorization
    const accessToken = authorization.split(" ")[1]
    return accessToken
}

const sendToken = (user, statusCode, res) => {
    const token = user.generateJwtFromUser()
    return res.status(statusCode).json({
        success: true,
        token
    })
}

module.exports = {
    sendToken,
    isTokenIncluded,
    getAccessTokenFromHeader
}