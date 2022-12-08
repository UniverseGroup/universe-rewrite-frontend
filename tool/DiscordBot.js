const {Client,IntentsBitField,EmbedBuilder} = require('discord.js')
const Dokdo = require("dokdo");
require('dotenv').config({path:"../.env"})
const myIntents = new IntentsBitField(3276799);
const DiscordBot = new Client({intents: myIntents});
const DokdoHandler = new Dokdo(DiscordBot, {aliases: ['dokdo', 'dok'], prefix: '!'})
module.exports.DiscordBot = DiscordBot;
module.exports.DokdoHandler = DokdoHandler
const guildID = '953953436133650462'

const reportChannelID = '1011145869971693640'
// const loggingChannelID = '844006379823955978'
// const statsLoggingChannelID = '653227346962153472'

//const reviewGuildID = '906537041326637086'
// const botReviewLogChannelID = '906551334063439902'
// const openBotReviewLogChannelID = '1008376563731013643'
DiscordBot.on('messageCreate', async message => {
    if (message.content === 'ping') return message.channel.send('Pong') // handle commands first
    DokdoHandler.run(message) // try !dokdo
})
DiscordBot.once('ready', async () => {
    console.log('I\'m Ready')
    await getMainGuild().members.fetch()
    console.log(`Fetched ${getMainGuild().members.cache.size} Members`)
})


const getMainGuild = () => DiscordBot.guilds.cache.get(guildID)
//module.exports.getMainGuild = getMainGuild();
//export const getReviewGuild = () => DiscordBot.guilds.cache.get(reviewGuildID)
const getReportChannel = () => getMainGuild()?.channels.cache.get(reportChannelID)
//module.exports.getReportChannel = getReportChannel()
// export const getLoggingChannel = () => getMainGuild().channels.cache.get(loggingChannelID)
// export const getBotReviewLogChannel = () => getReviewGuild().channels.cache.get(botReviewLogChannelID)
// export const getStatsLoggingChannel = () => getMainGuild().channels.cache.get(statsLoggingChannelID)
// export const getOpenBotReviewLogChannel = () => getMainGuild().channels.cache.get(openBotReviewLogChannelID)
const fetchUser = async (id) => await DiscordBot.users.fetch(id)

module.exports.discordLog = async ({Botid, prefix, library, category,}) => {
    // getReportChannel()?.send({
    //     content: `
    //
    //             Botid: ${Botid}
    //             prefix: ${prefix}
    //             library: ${library}
    //             category: ${category.join(", ")}
    //             `
    // })
    const fetchedUser = await fetchUser(Botid)
    const embed = new EmbedBuilder()
        .setTitle(`${fetchedUser.username}(${Botid}) Submitted`)
        .addFields(
            {
                name: 'prefix',
                value: prefix,
            },
            {
                name: 'library',
                value: library,
            },
            {
                name: 'category',
                value: category.join(", "),
            },
        )
        .setThumbnail(fetchedUser.displayAvatarURL())
        .setTimestamp()
    getReportChannel()?.send({
        content: "<@281566165699002379>",
        embeds: [embed],
    })
}
