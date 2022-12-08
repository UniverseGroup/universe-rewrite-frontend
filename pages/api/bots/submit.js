import dbConnect from '../../../lib/dbConnect'
import PendBot from '../../../models/PendBot'

export default async function handler(req, res) {
    const { method } = req
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
            try {
                const pendbot = await PendBot.create(
                    req.body
                ) /* create a new model in the database */
                res.status(201).json({ success: true, data: pendbot })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}