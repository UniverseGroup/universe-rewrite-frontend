import Link from "next/link";
import dynamic from "next/dynamic";
import dbConnect from "../../../lib/dbConnect";
import Bot from "../../../models/Bot";
import Image from "next/image";
import { botApi } from "../../../tool/Tools";
import { useRouter } from "next/router";
const BotCard = dynamic(() => import("../../../components/BotCard"))
const Divider = dynamic(() => import("../../../components/Divider"));
const SearchBar = dynamic(() => import("../../../components/SearchBar"));
const Category = ({bots}) => {
    console.log(bots)
    const router = useRouter()
    return(
        <div className="p-10">
            <div className="w-full text-center">
                <h1 className="text-4xl font-bold text-white">{`"${router.query.name}"에 대한 검색결과입니다.`}</h1>
            </div>
            <SearchBar/>
            <div className="relative">
                <Divider/>
                <div className="flex flex-wrap">
                    {bots.length !==0?bots.map((bot) => (
                        <div key={bot.botid} className="p-4 w-80">
                            <BotCard
                                name={bot.name}
                                avatar={bot.avatar}
                                slug={bot.slug}
                                id={bot._id}
                                invite={bot.invite}
                                gif={bot.gif}
                            />
                        </div>
                    )):<p className="text-white text-3xl font-bold w-full text-center h-screen">이곳은 너무 조용하네요...</p>}
                </div>
            </div>
            
        </div>
    )
}
export async function getServerSideProps(context) {
    await dbConnect();
    const {name} = context.query;
    const bots = await Bot
        .find({
            approved:true,
            category:{$in:[name]}
        },{__v:0,_id:0,token:0})
        .sort({votes:-1})
    const botData = await Promise.all(bots.map(async function(doc){
        const bot = {}
        const botResp = await botApi().get("members",{
            searchParams:{
                id:doc.botid
            }
        })
        const botJson = await botResp.json();
        bot.botid = doc.botid;
        bot.slug = doc.slug;
        bot.invite = doc.invite;
        bot.avatar = botJson.avatar;
        bot.name = botJson.name;
        return bot;
    }))
    return {
        props: {
            bots: JSON.parse(JSON.stringify(botData))
        }
    }
}
export default Category;