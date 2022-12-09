// import Field from "../components/Field";
//import Markdown from "../components/Markdown";
import {useState, useEffect,useRef} from "react";
import Image from "next/image";
import Link from "next/link";
//import BotCard from "../components/BotCard";
//import ImgSlider from "../components/ImgSlider";
import dynamic from "next/dynamic";
import Typed from "typed.js";
const ScrollButton = dynamic(() => import("../components/TopBtn"), {ssr: false});
const ImgSlider = dynamic(() => import("../components/ImgSlider"));
const BotCard = dynamic(() => import("../components/BotCard"));
const Odometer = dynamic(import('react-odometerjs'), {
    ssr: false,
});
export default function Index(){
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
    return(
        <>
            <ScrollButton/>
            <div className="min-h-screen">
                <div className="bg-discord-black">
                    <div className="container mx-auto px-5 py-5">
                        <div className="text-center my-10">
                            <h1 className="text-4xl text-white font-bold">
                                <span className="text-universe-blue">UNIVERSE</span> List
                            </h1>
                            <p className="text-white text-lg">
                                이 공간에서 <span ref={typing}/>(을)를 찾아보세요!
                            </p>
                        </div>
                        <div className="relative my-5">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                   className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="이곳에서 검색해보세요!"/>
                            <button type="submit"
                                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                            </button>
                        </div>
                        <div className="flex flex-wrap mt-5 gap-1">
                            <Link href="#" passHref>
                                <a className="flex items-center gap-1 rounded-md bg-universe-blue text-white transform ease-in-out duration-150 hover:-translate-y-1 hover:scale-103 w-fit p-3">
                                    <Image src="/svg/bot.svg" width={25} height={25} alt={"bot"}/>봇 리스트
                                </a>
                            </Link><Link href="#" passHref>
                                <a className="flex items-center gap-1 rounded-md bg-universe-blue text-white transform ease-in-out duration-150 hover:-translate-y-1 hover:scale-103 w-fit p-3">
                                    <Image src="/svg/people.svg" width={25} height={25} alt={"bot"}/>길드 리스트
                                </a>
                            </Link><Link href="#" passHref>
                                <a className="rounded-md bg-discord-blurple text-white transform ease-in-out duration-150 hover:-translate-y-1 hover:scale-103 w-fit p-3">
                                    관리 봇
                                </a>
                            </Link><Link href="#" passHref>
                                <a className="rounded-md bg-discord-blurple text-white transform ease-in-out duration-150 hover:-translate-y-1 hover:scale-103 w-fit p-3">
                                    뮤직 봇
                                </a>
                            </Link><Link href="#" passHref>
                                <a className="rounded-md bg-discord-blurple text-white transform ease-in-out duration-150 hover:-translate-y-1 hover:scale-103 w-fit p-3">
                                    경제 봇
                                </a>
                            </Link><Link href="#" passHref>
                                <a className="rounded-md bg-discord-blurple text-white transform ease-in-out duration-150 hover:-translate-y-1 hover:scale-103 w-fit p-3">
                                    미니게임 봇
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-5 py-5">
                    <ImgSlider/>
                    <div className="py-5">
                        <div className="z-0 mx-auto w-full text-center text-white " style={{height:"70px"}}>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-1">
                        <Image src="/svg/bot-universe-blue.svg" width={40} height={40} alt={"bot"}/> 최초 등록봇
                    </h1>
                    <p className="text-gray-300">
                        최초 등록봇은 최초 등록된 유저를 위한 봇입니다.
                    </p>
                    <div className="grid gap-x-4 gap-y-2 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 mb-10">

                        <BotCard/>
                        <BotCard/>
                        <BotCard/>
                        <BotCard/>

                    </div>
                    <a className="justify-center text-gray-50 bg-gray-700 text-black dark:text-gray-400 rounded-md flex hover:bg-discord-dark-hover cursor-pointer px-4 py-4 mb-1"
                       href="#">봇 리스트 바로가기</a>
                    <div className="py-5">
                        <div className="z-0 mx-auto w-full text-center text-white " style={{height:"90px"}}>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white">
                        🤖 최초 등록봇
                    </h1>
                    <p className="text-gray-300">
                        최초 등록봇은 최초 등록된 유저를 위한 봇입니다.
                    </p>
                    <div className="grid gap-4 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  p-4">

                        <BotCard/>
                        <BotCard/>
                        <BotCard/>
                        <BotCard/>
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
                    <Link href="/addbot" passHref><button className="bg-blue-600 text-white rounded-md flex hover:bg-blue-700 cursor-pointer sm:px-64 px-3 py-4 mb-1">
                        <Image src="/svg/bot.svg" width={25} height={25} alt={"bot"}/>봇 등록하기
                    </button></Link>
                    </div>

                </div>
            </div>

        </>

    )
}
