import Link from "next/link";
import Image from "next/image";
import { useState,useRef } from "react";
import useOutsideClick from "../tool/useOutsideClick";
import {api} from "../tool/Tools"
const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [data, setData] = useState(undefined);
    const [isloading, setIsloading] = useState(false);
    const ref = useRef();
    useOutsideClick(ref,()=>{
        setFocus(false);
    })
    const searchHandler = async (value) => {
        setIsloading(true);
        const res = await api().get(`search?q=${value}`);
        const Json = await res.json();
        setIsloading(false);
        if(Json.length === 0){
            return setData(undefined);
        }
        setData(Json);
    }
    return (
        <>
            <div className="relative my-5" ref={ref}>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
                <input type="search" id="default-search"
                        className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="이곳에서 검색해보세요!"
                        onFocus={()=>setFocus(true)}
                        onChange={(e)=>{
                            setSearch(e.target.value);
                            searchHandler(e.target.value);
                        }}/>
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
                </Link><Link href="/bots/category/미니게임 봇" passHref>
                    <a className="rounded-md bg-discord-blurple text-white transform ease-in-out duration-150 hover:-translate-y-1 hover:scale-103 w-fit p-3">
                        미니게임 봇
                    </a>
                </Link><Link href="/bots/category/빗금 명령어" passHref>
                    <a className="rounded-md bg-discord-blurple text-white transform ease-in-out duration-150 hover:-translate-y-1 hover:scale-103 w-fit p-3">
                        빗금 명령어
                    </a>
                </Link>
            </div>
            <div className={`${focus ? "block" : "hidden"} relative z-50 bg-white rounded-md p-2 shadow-xl`}
                    style={{
                        top:"-4rem"
                    }}>
                <ul className="h-96 overflow-y-scroll">
                    {
                        isloading ? '검색중입니다...'
                        : data === undefined ? (search === "" ? "검색어를 입력해주세요"
                        : "검색 결과가 없습니다.")
                        : data.map((item,index)=>{
                            return (
                                <Link href={`/bots/${item.botid}`} passHref key={index}>
                                    <li className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:cursor-pointer">
                                        <Image src={item.avatar
                                            ? item.avatar
                                            : "/svg/bot.svg"} width={50} height={50} alt={"bot"}/>
                                        <div className="flex flex-col">
                                            <span className="font-bold">{item.name}</span>
                                            <span className="text-gray-500">{item.slug}</span>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })
                        
                    }
                </ul>
            </div>
        </>
    )
}
export default SearchBar;