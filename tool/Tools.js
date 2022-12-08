import jsonwebtoken from 'jsonwebtoken';

export function redirectTo(router, to) {
    router.push(to)
    return
}
export function signJwt(data,exp){
    console.log(exp)
    return jsonwebtoken.sign(data, process.env.JWT_SECRET, {expiresIn: exp})
}
export function verifyJwt(jwt) {
    try {
        return jsonwebtoken.verify(jwt, "daiwjdicinivsoincoa2$dwaidiaw*)danwdianiN!kfnonaoi")
    } catch(e) {
        console.log(e)
        return null
    }
}
export function decodeJwt(jwt) {
    return jsonwebtoken.decode(jwt)
}

export function getProfileImg(id,avatar){
    if(avatar) {
        const useravatar_format = avatar && avatar.startsWith("a_") ? "gif" : "webp"
        return avatar && `https://cdn.discordapp.com/avatars/${id}/${avatar}.${useravatar_format}`
    } else {
        return 'https://cdn.discordapp.com/embed/avatars/0.png'
    }
}