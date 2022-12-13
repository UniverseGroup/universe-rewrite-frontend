import dbConnect from "../../../lib/dbConnect";
import ReportBot from "../../../models/ReportBot";
import { decodeJwt,botApi } from "../../../tool/Tools";
export default async function handler(req, res) {
    const { method,headers,body } = req
    await dbConnect()
    switch (method) {
        case 'GET':
            try {
                const reportbots = await ReportBot.find({}) /* find all the data in our database */
                res.status(200).json({ success: true, data: reportbots })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            if(!headers['authorization']) return res.status(401).json({ success: false, message: "Unauthorized" })
            try {
                const decoded = decodeJwt((headers['authorization']).replace('Bearer ',''))
                const reportbot = await ReportBot.create(
                    {
                        botid:body.botid,
                        userid:decoded.id,
                        category:body.category,
                        description:body.description,
                    }
                )
                await botApi().post("report",{
                    json: {
                        botid:body.botid,
                        userid:decoded.id,
                        category:body.category,
                        description:body.description,
                    }
                })
                res.status(201).json({ success: true, data: reportbot })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}