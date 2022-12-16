import dbConnect from '../../lib/dbConnect';
import Bot from '../../models/Bot';
import { botApi } from '../../tool/Tools';
export default async function handler(req, res) {
    const { query:{q},method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const bots = await Bot.find({
                    $or:
                        [
                            {
                                name:{
                                    $regex:'.*'+q+'.*',$options:'i'
                                }
                            },
                            {
                                botid:{
                                    $regex:'.*'+q+'.*',$options:'i'
                                }
                            }
                        ],
                    approved:true
                }); /* find all the data in our database */
                const reBot = await Promise.all(bots.map(async function(doc){
                    const bot = {}
                    const botResp = await botApi().get("members",{
                        searchParams:{
                            id:doc.botid
                        }
                    })
                    const botJson = await botResp.json();
                    bot.avatar = botJson.avatar;
                    bot.name = doc.name;
                    bot.botid = doc.botid;
                    bot.slug = doc.slug;
                    return bot;
                }))

                res.status(200).json(reBot)
            } catch (error) {
                console.log(error)
                res.status(400).json([])
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}