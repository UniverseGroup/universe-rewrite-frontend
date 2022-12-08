import {generateOauthURL} from "../../../../tool/Constants";

export default async function handler(req, res) {
    return res.redirect(
        301,
        "https://discord.com/oauth2/authorize?client_id=953110159247433758&scope=identify email guilds guilds.join&permissions=0&response_type=code&redirect_uri=http://localhost:3000/api/auth/discord/callback&prompt=none"

    )
}
