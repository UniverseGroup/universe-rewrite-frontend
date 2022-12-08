import Image from "next/image";
import Link from "next/link";

const BotCard = () => {
    return(
        <>
            <div
                className="w-80 h-fit rounded-lg bg-gray-800
                transform ease-in-out duration-150 hover:-translate-y-1 hover:scale-103
                hover:outline hover:outline-1 hover:outline-discord-blurple outline-offset-2"
                style={{background:"linear-gradient(to right, rgba(34, 36, 38, 0.6), rgba(34, 36, 38, 0.6)), url('/banner/3.gif') center top / cover no-repeat",color:"white"}}>
                <div className="p-6">
                    <Image className="rounded-full" width={"500px"} height={"500px"}
                           src="/api/img?url=https://cdn.discordapp.com/avatars/893841721958469703/d1d394c5cbe6b81ad4c18b8502f64d07.webp"
                           alt="img" placeholder="blur"
                           blurDataURL="/api/img?url=https://cdn.discordapp.com/avatars/893841721958469703/d1d394c5cbe6b81ad4c18b8502f64d07.webp"
                            loading="lazy"/>
                </div>
                <div className="p-5">
                    <Link href="#" passHref>
                        <a className="text-center">
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Harin
                            </h5>
                        </a>
                    </Link>
                    <p className="mb-3 font-normal text-gray-200">
                        유저친화적인 다기능봇.
                    </p>
                </div>
                <div className="flex h-12 divide-x divide-gray-400 border-t border-gray-400">
                    <a href="#"
                       className="w-full rounded-bl-xl flex justify-center items-center py-2 px-3 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        상세정보
                        <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                    </a>
                    <a href="#"
                       className="w-full rounded-br-xl flex justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">
                        초대하기
                    </a>
                </div>
            </div>
        </>
    )
}
export default BotCard;
