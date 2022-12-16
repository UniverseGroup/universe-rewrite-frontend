// import Field from "../components/Field";
//import Markdown from "../components/Markdown";
import {useState, useEffect,useRef} from "react";
import Image from "next/image";
import Link from "next/link";
//import BotCard from "../components/BotCard";
//import ImgSlider from "../components/ImgSlider";
import dynamic from "next/dynamic";
import Typed from "typed.js";
import dbConnect from "../lib/dbConnect";
import Bot from "../models/Bot";
import {botApi} from "../tool/Tools";
const ScrollButton = dynamic(() => import("../components/TopBtn"), {ssr: false});
const ImgSlider = dynamic(() => import("../components/ImgSlider"));
const BotCard = dynamic(() => import("../components/BotCard"));
const SearchBar = dynamic(() => import("../components/SearchBar"));
const Odometer = dynamic(import('react-odometerjs'), {
    ssr: false,
});
const Index = ({bots})=>{
    const [text, setText] = useState("");
    const typing = useRef(null);
    const typed = useRef(null);
    const [counter, setCounter] = useState(1000);
    useEffect(() => {
        const options = {
            strings: [
                '<strong>독특한 봇</strong>',
                '<strong>경제 봇</strong>',
                '<strong>관리 봇</strong>',
                '<strong>미니게임 봇</strong>',
                '<strong>친목 서버</strong>',
                '<strong>공식 서버</strong>',
                '<a href="/gawiisgood"><strong>gawi</strong></a>',
                '<strong>홍보 서버</strong>',
                '<strong>다기능 봇</strong>',
                '<strong>대시보드 봇</strong>',
            ],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
        };
        typed.current = new Typed(typing.current, options);
        // const interval = setInterval(() => {
        //     setCounter((amount) => amount - Math.floor(Math.random() * 100));
        //     document.getElementById("counter").classList.remove("text-white");
        //     document.getElementById("counter").classList.add("text-red-500");
        //     setTimeout(() => {
        //         document.getElementById("counter").classList.remove("text-red-500");
        //         document.getElementById("counter").classList.add("text-white");
        //     }, 2000);
        // }, 2500);
        return () => {
            // Make sure to destroy Typed instance during cleanup
            // to prevent memory leaks
            typed.current.destroy();
            //clearInterval(interval);
        }
    },[]);
    console.log(bots);
    return(
        <>
            <ScrollButton/>
            <div className="min-h-screen">
                <div className="bg-discord-black">
                    <div className="container mx-auto px-5 py-5">
                        <div className="text-center my-10">
                            <h1 className="text-4xl text-[#378B29] font-bold">
                                <span className="text-universe-blue">UNIVERSE</span> List
                            </h1>
                            <p className="text-white text-lg">
                                이 공간에서 <span ref={typing}/>(을)를 찾아보세요!
                            </p>
                        </div>
                        <SearchBar/>
                    </div>
                </div>

                <div className="container mx-auto px-5 py-5">
                    <ImgSlider/>
                    <div className="py-5">
                        <div className="z-0 mx-auto w-full text-center text-white " style={{height:"70px"}}>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-[#FF0000] flex items-center gap-1">
                        <Image src="/svg/bot-universe-blue.svg" width={40} height={40} alt={"bot"}/> 최초 등록봇
                    </h1>
                    <p className="text-gray-300">
                        최초 등록봇은 UNIVERSE 서비스 초창기에 등록된 봇입니다.
                    </p>
                    <div className="grid gap-x-4 gap-y-2 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 mb-10">

                        <BotCard/>
                        <BotCard/>
                        <BotCard/>
                        <BotCard/>

                    </div>
                    <a className="justify-center bg-gradient-to-r from-[#74D680] to-[#378B29] text-[#FF0000] font-bold  rounded-md flex cursor-pointer px-4 py-4 mb-1"
                       href="#">봇 리스트 바로가기</a>
                    <div className="py-5">
                        <div className="z-0 mx-auto w-full text-center text-white " style={{height:"90px"}}>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white">
                        🤖 봇 리스트
                    </h1>
                    <p className="text-gray-300">
                        여러 유저가 등록한 봇들을 만나보세요.
                    </p>
                    <div className="flex flex-wrap  gap-4 p-4">
                        {
                            bots.map((bot) => (
                                <BotCard key={bot.botid} name={bot.name} avatar={bot.avatar} slug={bot.slug} id={bot.botid}/>
                            ))
                        }
                    </div>
                    <div className="py-5">
                        <div className="z-0 mx-auto w-full text-center text-white " style={{height:"90px"}}>
                        </div>
                    </div>
                    <h4 className="text-4xl font-bold text-white text-center">
                        현재 UNIVERSE에는
                    </h4>
                    <p className="text-white text-center text-5xl" id="counter"><Odometer
                                                        value={counter}
                                                        format="(,ddd)"
                                                        theme="default"
                                                        />개의</p>
                    <h2 className="text-4xl font-bold text-white text-center">봇이 등록되어있습니다!</h2>
                    <div className="py-5">
                        <div className="z-0 mx-auto w-full text-center text-white " style={{height:"90px"}}>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                    <Link href="/addbot" passHref><button className="bg-gradient-to-r from-[#74D680] to-[#378B29] text-[#FF0000] font-bold rounded-md flex  cursor-pointer sm:px-64 px-3 py-4 mb-1">
                        <Image src="/svg/bot.svg" width={25} height={25} alt={"bot"}/>봇 등록하기
                    </button></Link>
                    </div>

                </div>
            </div>

        </>

    )
}

export async function getServerSideProps() {
    await dbConnect()
    const result = await Bot.find({approved: true}).limit(10)
    const bots = await Promise.all(result.map(async function (doc){
        let rBot = {}
        const res = await botApi().get('members',{
            searchParams: {
                id: doc.botid
            }
        })
        const botData = await res.json()
        rBot.botid=doc.botid
        rBot.name=botData.name
        rBot.avatar=botData.avatar
        rBot.slug=doc.slug
        rBot.invite=doc.invite
        return rBot
    }))
    return {
        props: {
            bots: JSON.parse(JSON.stringify(bots))
        }
    }
}
export default Index;