// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {discordLog,DiscordBot} from "../../tool/DiscordBot";
DiscordBot.login(process.env.DISCORD_TOKEN);
export default async function handler(req, res) {
    const {id, prefix, library, category} = req.body;
    if (req.method === "POST") {
        await discordLog({Botid:id, prefix:prefix, library:library, category:category})
        res.status(200).json({message: 'Thanks for your feedback!'});
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}
