import jsonwebtoken from 'jsonwebtoken';
import ky from 'ky-universal';
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

export const api = (jwt) => ky.create({
    prefixUrl: "http://localhost:3000/api",
    hooks:jwt? {
        beforeRequest: [
            request => {
                request.headers.set('Authorization', `Bearer ${jwt}`)
            }
        ]
    } : undefined
})

export const botApi = () => ky.create({
    prefixUrl: "http://127.0.0.1:5000"
})

export const captchaApi = (token) => ky.create({
    prefixUrl: "https://demo.mcaptcha.org/api/v1",
    json: {
        token: token,
        key: process.env.CAPTCHA_SITEKEY,
        secret: process.env.CAPTCHA_SECRET
    }
})

export const generateOgImage = ({title,description,avatar,hearts,guilds}) => {
    const u = new URL("http://211.38.204.211:3000/api/og")
    u.searchParams.append("title",title)
    u.searchParams.append("description",description)
    u.searchParams.append("image",avatar?.replace("https://cdn.discordapp.com/avatars/",""))
    u.searchParams.append("hearts",hearts)
    u.searchParams.append("guilds",guilds)
    u.searchParams.append("v",Date.now())
    return u.href

}