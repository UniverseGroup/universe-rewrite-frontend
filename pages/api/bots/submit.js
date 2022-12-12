import dbConnect from '../../../lib/dbConnect'
import PendBot from '../../../models/PendBot'
import { decodeJwt,botApi,captchaApi } from '../../../tool/Tools'
import Bot from '../../../models/Bot'
export default async function handler(req, res) {
    const { method,headers,body } = req
    await dbConnect()
    switch (method) {
        case 'GET':
            try {
                const pendbots = await PendBot.find({}) /* find all the data in our database */
                res.status(200).json({ success: true, data: pendbots })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            if(!headers['authorization']) return res.status(401).json({ success: false, message: "Unauthorized" })
            const captcha = await captchaApi(body.captcha).post("pow/siteverify").json()
            if(!captcha.valid) return res.status(401).json({ success: false, message: "Captcha failed" })
            try {
                const user = await botApi().get("members",{
                    searchParams: {
                        id: body.id
                    }
                }).json()
                const decoded = decodeJwt((headers['authorization']).replace('Bearer ',''))
                const findpendbot = await PendBot.findOne({botid:body.id})
                if(findpendbot&&(findpendbot.pending||findpendbot.approved)) return res.status(400).json({ success: false, message: "Bot already submitted" })
                const pendbot = await PendBot.create(
                    {
                        botid:body.id,
                        userid:decoded.id,
                        category:body.category,
                        prefix:body.prefix,
                        slug:body.intro,
                        description:body.desc,
                    }
                )
                await Bot.create(
                    {
                        botid:body.id,
                        botdescription:body.desc,
                        owners:[decoded.id],
                        library:body.library,
                        prefix:body.prefix,
                        invite:body.invite ? body.invite : "https://discord.com/oauth2/authorize?client_id="+body.id+"&scope=bot&permissions=0",
                        status:"online",
                        guilds:0,
                        hearts:0,
                        discordVerified:user.verified,
                        trusted:false,
                        approved:false,
                        banned:false,
                        bannedreason:"",
                        token:"",
                        slug:body.intro,
                        support:body.discord ? body.discord : null,
                        github:body.git ? body.git : null,
                        website:body.website ? body.website : null,
                        category:body.category,
                    }
                )
                botApi().post("submit",{
                    json: req.body
                })
                res.status(201).json({ success: true, data: pendbot })
            } catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}