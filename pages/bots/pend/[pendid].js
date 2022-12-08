import Image from "next/image";
import dynamic from "next/dynamic";
import MessageBox from "../../../components/MessageBox";
import { useRouter } from "next/router";
const Divider = dynamic(() => import("../../../components/Divider"));
const Markdown = dynamic(() => import("../../../components/Markdown"));
const BotPendPage = () => {
    const getSubmitDate = (timeStamp) => {
        const date = new Date(timeStamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${year}. ${month}. ${day<10?"0"+day:day} ${hour}:${minute}:${second< 10 ? "0" + second : second}`;
    };
        
    return (
        <>
            <div className="min-h-screen">
                <div className="bg-discord-black">
                    <div className="container mx-auto px-5 py-5 text-white">
                        <MessageBox type='success'>
                            <h2 className='text-lg font-semibold'>해당 봇은 심사통과상태입니다.</h2>
                            <p>심사에서 통과되어 봇 리스트에 등재되었습니다.</p>
                        </MessageBox>
                        <div className="lg:flex w-full items-center">
                            <div className="w-full text-center lg:w-2/12">
                                <Image alt="Image" loading="lazy"
                                       width={200} height={200}
                                       className="w-full rounded-full"
                                       src="/api/img?url=https://cdn.discordapp.com/avatars/893841721958469703/d1d394c5cbe6b81ad4c18b8502f64d07.webp"/>
                            </div>
                            <div className="flex-grow px-5 py-12 w-full text-center lg:w-5/12 lg:text-left">
                                <a className=" text-center text-base bg-little-white
                                bg-discord-dark-hover w-fit flex items-center text-white rounded-3xl px-2.5 py-1.5 mr-1 mb-2 gap-1">
                                    <div className="w-3 h-3 rounded-full border bg-green-500"/>
                                    온라인
                                </a>
                                <h1 className="mb-2 mt-3 text-4xl font-bold">테스트 </h1>
                                <p className="text-gray-300">디스코드를 더 편하게</p>
                            </div>
                        </div>
                        <Divider/>
                        <div className="hidden lg:block">
                            <div className="py-5">
                                <div className="z-0 mx-auto w-full text-center text-white " style={{height: "90px"}}>
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex lg:flex-row-reverse">
                            <div className="mb-1 w-full lg:w-1/4">
                                <h2 className="3xl mb-2 font-bold">정보</h2>
                                <div className="grid gap-4 grid-cols-2 px-4 py-4
                                text-gray-300 bg-gray-700 rounded-sm">
                                    <div>신청일</div>
                                    <div>
                                        {
                                            getSubmitDate(1670045406000)
                                        }
                                    </div>
                                    <div>접두사</div>
                                    <div className="markdown-body text-black dark:text-gray-400"><code>빗금 명령어 (/)</code>
                                    </div>
                                    <div>봇 생성일</div>
                                    <div>일 년 전</div>
                                </div>
                                <h2 className="3xl mb-2 mt-2 font-bold">카테고리</h2>
                                <div className="flex flex-wrap"><a
                                    className=" text-center text-gray-100  bg-gray-500 hover:bg-gray-700
                                    rounded px-2 py-1 mr-1 mb-2 dark:hover:bg-discord-dark-hover transition
                                    duration-100 ease-in"
                                    href="/bots/categories/%EA%B4%80%EB%A6%AC">관리</a><a
                                    className=" text-center text-gray-100  bg-gray-500 hover:bg-gray-700
                                    rounded px-2 py-1 mr-1 mb-2 dark:hover:bg-discord-dark-hover transition
                                    duration-100 ease-in"
                                    href="/bots/categories/%EB%8F%84%EB%B0%95">도박</a><a
                                    className=" text-center text-gray-100  bg-gray-500 hover:bg-gray-700
                                    rounded px-2 py-1 mr-1 mb-2 dark:hover:bg-discord-dark-hover transition
                                    duration-100 ease-in"
                                    href="/bots/categories/%EB%B9%97%EA%B8%88%20%EB%AA%85%EB%A0%B9%EC%96%B4">빗금
                                    명령어</a><a
                                    className=" text-center text-gray-100  bg-gray-500 hover:bg-gray-700
                                    rounded px-2 py-1 mr-1 mb-2 dark:hover:bg-discord-dark-hover transition
                                    duration-100 ease-in"
                                    href="/bots/categories/%EB%B0%88">밈</a><a
                                    className=" text-center text-gray-100  bg-gray-500 hover:bg-gray-700
                                    rounded px-2 py-1 mr-1 mb-2 dark:hover:bg-discord-dark-hover transition
                                    duration-100 ease-in"
                                    href="/bots/categories/%EB%A0%88%EB%B2%A8%EB%A7%81">레벨링</a><a
                                    className=" text-center text-gray-100  bg-gray-500 hover:bg-gray-700
                                    rounded px-2 py-1 mr-1 mb-2 dark:hover:bg-discord-dark-hover transition
                                    duration-100 ease-in"
                                    href="/bots/categories/%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0">유틸리티</a><a
                                    className=" text-center text-gray-100  bg-gray-500 hover:bg-gray-700
                                    rounded px-2 py-1 mr-1 mb-2 dark:hover:bg-discord-dark-hover transition
                                    duration-100 ease-in"
                                    href="/bots/categories/%EA%B2%80%EC%83%89">검색</a><a
                                    className=" text-center text-gray-100  bg-gray-500 hover:bg-gray-700
                                    rounded px-2 py-1 mr-1 mb-2 dark:hover:bg-discord-dark-hover transition
                                    duration-100 ease-in"
                                    href="/bots/categories/%EC%BD%94%EB%A1%9C%EB%82%9819">코로나19</a></div>
                                <h2 className="3xl mb-2 mt-2 font-bold">등록 신청자</h2>
                                <a className="bg-gray-700 gap-2 flex mb-1 px-4 py-4 text-black rounded cursor-pointer items-center"
                                    href="/users/607178093177864205">
                                    <Image alt="Image" loading="lazy" className="rounded-full"
                                           src="/api/img?url=https://cdn.discordapp.com/avatars/893841721958469703/d1d394c5cbe6b81ad4c18b8502f64d07.webp"
                                           width={40} height={40}/>
                                    <div className="flex-1 w-0 text-white flex items-center">
                                        <h4 className="whitespace-nowrap">테스트</h4>
                                        <span className="text-gray-400 text-sm">#0000</span>
                                    </div>
                                </a>
                                <div className="list grid">
                                    <a rel="noopener noreferrer" target="_blank"
                                       className="text-discord-blurple hover:underline"
                                       href="https://discord.gg/qyMtTcu6N5">디스코드 서버</a></div>
                                <div className="py-5">
                                    <div className="z-0 mx-auto w-full text-center text-white "
                                         style={{height: "330px"}}>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:pr-5 lg:w-3/4">
                                <div
                                    className="py-3 px-7 text-black dark:text-white dark:bg-discord-black bg-little-white rounded my-4">
                                    <Markdown text={`# 이름\n\nHARIN`}/>
                                </div>
                                <div className="py-5">
                                    <div className="z-0 mx-auto w-full text-center text-white "
                                         style={{height: "90px"}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BotPendPage;
