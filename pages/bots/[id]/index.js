import Image from "next/image";
import dynamic from "next/dynamic";
import dbConnect from "../../../lib/dbConnect";
import Bot from "../../../models/Bot";
import { botApi,generateOgImage } from "../../../tool/Tools";
import { NextSeo } from "next-seo";
const Divider = dynamic(() => import("../../../components/Divider"));
const Markdown = dynamic(() => import("../../../components/Markdown"));
const BotPage = ({botData,botInfo}) => {
    console.log(botInfo);
    console.log(botData);
    return (
        <>
            <NextSeo
                title={botInfo?.name || "Unknown" }
                description={botData?.slug || "Unknown"}
                twitter={{
					cardType: 'summary_large_image'
				}}
                openGraph={{
                    images: [
                        {
                            url: generateOgImage({title:botInfo?.name,description:botData?.slug,avatar:botInfo?.avatar,hearts:botData?.hearts,guilds:botData?.guilds}),
                            width:2048,
                            height:1170,
                            alt: Date.now(),
                        },
                    ],
                }}
                robotsProps={{
                    maxImagePreview: 'large',
                    noarchive: true,
                }}
            />

            <div className="min-h-screen">
                <div className="bg-discord-black">
                    <div className="container mx-auto px-5 py-5 text-white">
                        <div className="lg:flex w-full items-center">
                            <div className="w-full text-center lg:w-2/12">
                                <Image alt="Image" loading="lazy"
                                       width={200} height={200}
                                       className="w-full rounded-full"
                                       src={botInfo?.avatar}/>
                            </div>
                            <div className="flex-grow px-5 py-12 w-full text-center lg:w-5/12 lg:text-left">
                                <a className=" text-base bg-little-white
                            bg-discord-dark-hover w-fit flex items-center text-white rounded-3xl px-2.5 py-1.5 gap-1 ">
                                <div className="w-3 h-3 rounded-full border bg-green-500"/>
                                온라인
                                </a>
                                <h1 className="mb-2 mt-3 text-4xl font-bold">{botInfo?.name}</h1> 
                                
                                
                                <p className="text-gray-300">{botData?.slug}</p>
                            </div>
                            <div className="w-full lg:w-1/4">
                                <a href={botData?.invite}
                                    rel="noopener noreferrer"
                                    target="_blank">
                                    <div className="text-white bg-green-600 rounded flex hover:bg-green-800 dark:hover:bg-discord-dark-hover cursor-pointer px-4 py-4 mb-1">
                                        <h4 className="whitespace-nowrap">
                                            초대하기
                                        </h4>
                                    </div>
                                </a>
                                <div className="text-white bg-discord-dark-hover rounded flex hover:bg-little-white-hover dark:hover:bg-discord-dark-hover cursor-pointer px-4 py-4 mb-1">
                                    <h4 className="whitespace-nowrap">
                                        하트추가하기 • {botData?.hearts}
                                    </h4>
                                </div>
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
                                    <div>접두사</div>
                                    <div className="markdown-body text-black dark:text-gray-400"><code>{botData?.prefix}</code>
                                    </div>
                                    <div>서버수</div>
                                    <div>{botData?.guilds}</div>
                                    <div>봇 생성일</div>
                                    <div>{botInfo?.created_at}</div>
                                    <div>제작언어</div>
                                    <div>{botData?.library}</div>
                                    {
                                        botData?.discordVerified && (<div className="col-span-2">디스코드 인증됨</div>)
                                    }
                                    {
                                        botData?.trusted && (<div className="col-span-2">UNIVERSE 신뢰인증</div>)
                                    }
                                </div>
                                <h2 className="3xl mb-2 mt-2 font-bold">카테고리</h2>
                                <div className="flex flex-wrap">
                                    {
                                        botData?.category.map((category, index) => (
                                            <a key={index}
                                                className="bg-gray-700 gap-2 flex mb-1 px-4 py-4 text-gray-200 rounded cursor-pointer items-center"
                                                href={`/category/${category}`}>
                                                <h4 className="whitespace-nowrap">
                                                    {category}
                                                </h4>
                                            </a>
                                        ))
                                    }
                                </div>
                                <h2 className="3xl mb-2 mt-2 font-bold">등록자</h2>
                                {
                                    botData?.owners.map((owner, index) => (
                                        <a key={index}
                                            className="bg-gray-700 gap-2 flex mb-1 px-4 py-4 text-black rounded cursor-pointer items-center"
                                            href={`/users/${owner.id}`}>
                                            <Image alt="Image" loading="lazy" className="rounded-full"
                                                    src={owner.avatar}
                                                    width={40} height={40}/>
                                            <div className="flex-1 w-0 text-white flex items-center">
                                                <h4 className="whitespace-nowrap">{owner.name}</h4>
                                                <span className="text-gray-400 text-sm">#{owner.discriminator}</span>
                                            </div>
                                        </a>
                                    ))
                                }
                                <div className="list grid">
                                    <a className="text-red-600 hover:underline cursor-pointer"
                                        aria-hidden="true"
                                        href={`/bots/${botData?.botid}/report`}>
                                            신고하기
                                    </a>
                                    {
                                        botData?.website && (
                                            <a rel="noopener noreferrer" target="_blank"
                                                className="text-discord-blurple hover:underline"
                                                href={botData?.website}>
                                                    웹사이트
                                            </a>
                                        )
                                    }
                                    {
                                        botData?.github && (
                                            <a rel="noopener noreferrer" target="_blank"
                                                className="text-discord-blurple hover:underline"
                                                href={botData.github}>
                                                    깃허브
                                            </a>
                                        )
                                    }
                                    {
                                        botData?.support && (
                                            <a rel="noopener noreferrer" target="_blank"
                                                className="text-discord-blurple hover:underline"
                                                href={botData.support}>
                                                    서포트 서버
                                            </a>
                                        )
                                    }
                                    </div>
                                <div className="py-5">
                                    <div className="z-0 mx-auto w-full text-center text-white "
                                         style={{height: "330px"}}>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:pr-5 lg:w-3/4">
                                <div
                                    className="py-3 px-7 text-black dark:text-white dark:bg-discord-black bg-little-white rounded my-4">
                                    <Markdown text={botData?.botdescription}/>
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

export async function getServerSideProps({query}) {
    const {id} = query;
    await dbConnect();
    const botData = await Bot.findOne({'botid': id}).lean();
    if (!botData) {
        return {
            props: {
                botData: null
            }
        }
    } else {
        const usersInfo = await botApi().get('members',{
            searchParams: {
                users: botData.owners
            }
        }).json();
        const botInfo = await botApi().get('members',{
            searchParams: {
                id: botData.botid
            }
        }).json();
        botData._id.toString();
        botData.owners = usersInfo;
        delete botData.__v;
        delete botData.token;
        delete botData._id;
        return {
            props: {
                botData: JSON.parse(JSON.stringify(botData)),
                botInfo: JSON.parse(JSON.stringify(botInfo))
            }
        }  
    }
    
}

export default BotPage;
