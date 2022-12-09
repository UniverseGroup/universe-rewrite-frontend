import dbConnect from '../../../lib/dbConnect'
import PendBot from '../../../models/PendBot'
import { api,decodeJwt,botApi } from '../../../tool/Tools'
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
            try {
                const user = await botApi().get("members",{
                    searchParams: {
                        id: body.id
                    }
                }).json()
                const decoded = decodeJwt((headers['authorization']).replace('Bearer ',''))
                const pendbot = await PendBot.create(
                    {
                        name:user.name,
                        botid:body.id,
                        userid:decoded.id,
                        category:body.category,
                        prefix:body.prefix,
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