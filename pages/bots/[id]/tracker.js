import StatusTraker from "../../../components/StatusTracker"
import PingTracker from "../../../components/PingTracker"
import BotGrowthGraph from "../../../components/BotGrowthGraph"
import Image from "next/image"
import Divider from "../../../components/Divider"
import BotCommandGraph from "../../../components/BotCommandGraph"
export default function BotStatusTraker (){
    return(
        <div className="min-h-screen">
            <div className="container mx-auto px-5 py-5 space-y-5">
                <div className="w-full flex justify-center">
                    <div className="space-y-3">
                       <Image className="rounded-full" width={"200px"} height={"200px"}
                           src="/api/img?url=https://cdn.discordapp.com/avatars/893841721958469703/d1d394c5cbe6b81ad4c18b8502f64d07.webp"
                           alt="img" placeholder="blur"
                           blurDataURL="/api/img?url=https://cdn.discordapp.com/avatars/893841721958469703/d1d394c5cbe6b81ad4c18b8502f64d07.webp"
                            loading="lazy"/> 
                        <h4 className="text-3xl font-bold text-center text-white">Harin#9147</h4>
                    </div>
                </div>
                <Divider className={"bg-white "}/>
                <div className="sm:p-5 space-y-5">
                    <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-2 gap-3">
                        <StatusTraker/>
                        <PingTracker/>
                    </div>
                    <BotGrowthGraph/>
                    <BotCommandGraph/>
                </div>
                
            </div>
        </div>
    )
}