import Image from "next/image";
import dynamic from "next/dynamic";
import MessageBox from "../../../components/MessageBox";
import { useRouter } from "next/router";
import dbConnect from "../../../lib/dbConnect";
import PendBot from "../../../models/PendBot";
import { botApi } from "../../../tool/Tools";
const Divider = dynamic(() => import("../../../components/Divider"));
const Markdown = dynamic(() => import("../../../components/Markdown"));

export const pendingMessage = ({approved,deny,denyReson,pending}) => {
    if(approved){
        return(
            <MessageBox type='success'>
                <h2 className='text-lg font-semibold'>해당 봇은 심사통과상태입니다.</h2>
                <p>심사에서 통과되어 봇 리스트에 등재되었습니다.</p>
            </MessageBox>
        )
    } else if(deny){
        return(
            <MessageBox type='error'>
                <h2 className='text-lg font-semibold'>해당 봇은 심사거절상태입니다.</h2>
                <p>거절사유: {denyReson}</p>
            </MessageBox>
        )
    } else if(pending){
        return(
            <MessageBox type='info'>
                <h2 className='text-lg font-semibold'>해당 봇은 심사대기상태입니다.</h2>
                <p>봇 심사는 최대 3일이 소요될 수 있습니다.</p>
            </MessageBox>
        )
    }
}


const BotPendPage = ({data}) => {
    const getSubmitDate = (timeStamp) => {
        console.log("timestamp",timeStamp);
        const date = new Date(parseInt(timeStamp));
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${year}. ${month<10?"0"+month:month}. ${day<10?"0"+day:day} ${hour<10?"0"+hour:hour}:${minute}:${second< 10 ? "0" + second : second}`;
    };
    const pendData = JSON.parse(data.pendData);
    const botInfo = JSON.parse(data.botInfo);
    const userInfo = JSON.parse(data.summiterInfo);
    return (
        <>
            <div className="min-h-screen">
                <div className="bg-discord-black">
                    <div className="container mx-auto px-5 py-5 text-white">
                        {/* <MessageBox type='success'>
                            <h2 className='text-lg font-semibold'>해당 봇은 심사통과상태입니다.</h2>
                            <p>심사에서 통과되어 봇 리스트에 등재되었습니다.</p>
                        </MessageBox> */}
                        {
                            !pendData.deny && !pendData.pending && pendData.approved && (
                                <MessageBox type='success'>
                                    <h2 className='text-lg font-semibold'>해당 봇은 심사통과상태입니다.</h2>
                                    <p>심사에서 통과되어 봇 리스트에 등재되었습니다.</p>
                                </MessageBox>
                            )                                
                        }
                        {
                            !pendData.approved && !pendData.pending && pendData.deny && (
                                <MessageBox type='error'>
                                    <h2 className='text-lg font-semibold'>해당 봇은 심사거절상태입니다.</h2>
                                    <p>거절사유: {pendData.denyReason}</p>
                                </MessageBox>
                            )
                        }
                        {
                            !pendData.approved && !pendData.deny && pendData.pending && (
                                <MessageBox type='info'>
                                    <h2 className='text-lg font-semibold'>해당 봇은 심사대기상태입니다.</h2>
                                    <p>봇 심사는 최대 3일이 소요될 수 있습니다.</p>
                                </MessageBox>
                            )
                        }
                        <div className="lg:flex w-full items-center">
                            <div className="w-full text-center lg:w-2/12">
                                <Image alt="Image" loading="lazy"
                                       width={200} height={200}
                                       className="w-full rounded-full"
                                       src={`${botInfo.avatar}`}/>
                            </div>
                            <div className="flex-grow px-5 py-12 w-full text-center lg:w-5/12 lg:text-left">
                                <h1 className="mb-2 mt-3 text-4xl font-bold">{botInfo.name}#{botInfo.discriminator}</h1>
                                <p className="text-gray-300">{pendData.slug}</p>
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
                                            getSubmitDate(pendData.submitTime)
                                        }
                                    </div>
                                    <div>접두사</div>
                                    <div className="markdown-body text-black dark:text-gray-400"><code>{pendData.prefix}</code>
                                    </div>
                                </div>
                                <h2 className="3xl mb-2 mt-2 font-bold">카테고리</h2>
                                <div className="flex flex-wrap">
                                    {
                                        pendData.category.map((category, index) => {
                                            return (
                                                <a key={index}
                                                   className=" text-center text-gray-100  bg-gray-500 hover:bg-gray-700
                                                   rounded px-2 py-1 mr-1 mb-2 dark:hover:bg-discord-dark-hover transition
                                                   duration-100 ease-in"
                                                   href={`/bots/categories/${category}`}>{category}</a>
                                            )
                                        })
                                    }
                                </div>
                                <h2 className="3xl mb-2 mt-2 font-bold">등록 신청자</h2>
                                <a className="bg-gray-700 gap-2 flex mb-1 px-4 py-4 text-black rounded cursor-pointer items-center"
                                    href={`/users/${userInfo.id}`}>
                                    <Image alt="Image" loading="lazy" className="rounded-full"
                                           src={userInfo.avatar}
                                           width={40} height={40}/>
                                    <div className="flex-1 w-0 text-white flex items-center">
                                        <h4 className="whitespace-nowrap">{userInfo.name}</h4>
                                        <span className="text-gray-400 text-sm">#{userInfo.discriminator}</span>
                                    </div>
                                </a>
                                <div className="py-5">
                                    <div className="z-0 mx-auto w-full text-center text-white "
                                         style={{height: "330px"}}>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:pr-5 lg:w-3/4">
                                <div
                                    className="py-3 px-7 text-black dark:text-white dark:bg-discord-black bg-little-white rounded my-4">
                                    <Markdown text={pendData.description}/>
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
    const {pendid} = query;
    await dbConnect();
    const pendData = await PendBot.findById(pendid).lean();
    const botInfo = await botApi().get('members',{
        searchParams: {
            id: pendData.botid
        }
    }).json()
    const summiterInfo = await botApi().get('members',{
        searchParams: {
            id: pendData.userid
        }
    }).json()
    console.log(pendData);
    pendData._id.toString();
    return {
        props: {
            data:{pendData:JSON.stringify(pendData),
                    botInfo:JSON.stringify(botInfo),
                    summiterInfo:JSON.stringify(summiterInfo)},
        },
    };
}

export default BotPendPage;
