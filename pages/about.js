import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link"
const ScrollButton = dynamic(() => import("../components/TopBtn"), {ssr: false});
const Divider = dynamic(() => import("../components/Divider"));
export default function About(){
    return(
        <>
            <ScrollButton/>
            <div className="min-h-screen">
                <div className="bg-discord-black">
                    <div className="container mx-auto px-5 py-5">
                        <h1 className="text-4xl text-white font-bold">
                            About <strong className="text-universe-blue">UNIVERSE</strong>
                        </h1>
                        <p className="text-white text-lg">
                            <strong className="text-universe-blue">UNIVERSE</strong>에 대한 이야기를 확인해보세요!
                        </p>
                        <Divider/>
                        <div className="mt-10 p-5">
                            <h1 className="text-3xl text-white font-bold">
                                <strong className="text-universe-blue">UNIVERSE</strong>는요..
                            </h1>
                            <p className="text-white text-lg">
                                <strong className="text-universe-blue">UNIVERSE</strong>는 서버를 찾아보고, 봇을 찾아보는 공간입니다.
                            </p>
                        </div>
                        <div className="mt-10 p-5">
                            <h1 className="text-3xl text-white font-bold">
                                <strong className="text-universe-blue">UNIVERSE</strong>의 특징
                            </h1>
                            <div className="p-2">
                                <h4 className="text-white text-2xl my-4">
                                    <strong>🔰 배지시스템</strong>
                                </h4>
                                <h5 className="text-white text-xl">
                                    - 심층적인 심사로 부여되는 다양한 배지로 봇의 신뢰도를 높힙니다.
                                </h5>
                                <h4 className="text-white text-2xl my-4">
                                    <strong>📡 다양한 API</strong>
                                </h4>
                                <h5 className="text-white text-xl">
                                    - <strong className="text-universe-blue">UNIVERSE</strong>에서 제공하는 다양한 API를 통해 써드파티에 적용하실 수 있습니다.
                                </h5>
                                <h4 className="text-white text-2xl my-4">
                                    <strong>📊 봇/서버 스텟</strong>
                                </h4>
                                <h5 className="text-white text-xl">
                                    - 봇 또는 서버의 스텟을 <strong className="text-universe-blue">UNIVERSE</strong>에서 확인해보세요. 다양한 정보를 대시보드에서 확인 하실 수 있습니다.
                                </h5>
                                <h4 className="text-white text-2xl my-4">
                                    <strong>💎 차별화된 특전</strong>
                                </h4>
                                <h5 className="text-white text-xl">
                                    - <strong className="text-universe-blue">UNIVERSE</strong>공식서버를 부스트하시거나 유료플랜에 따른 차별화된 특전들이 준비되어있습니다.
                                </h5>
                            </div>

                        </div>
                        <Divider/>
                        <div className="mt-10 p-5">
                            <h3 className="text-3xl text-white font-bold">
                                브랜드
                            </h3>
                            <div className="p-2">
                                <h4 className="text-white text-2xl my-5">
                                    <strong>슬로건</strong>
                                </h4>
                                <div className="p-2 w-fit bg-universe-blue rounded-md">
                                    <h5 className="text-white text-xl">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        "{"다양한 봇과 서버가 모여 만들어진 공간."}"
                                    </h5>
                                </div>
                                <h4 className="text-white text-2xl my-5">
                                    <strong>글꼴</strong>
                                </h4>
                                <h5 className="text-white text-xl">
                                    - Pretendard(<Link href="https://github.com/orioncactus/pretendard" rel="noreferrer" passHref><a target="_blank" className="text-blue-600 hover:underline">오픈소스</a></Link>)
                                </h5>
                                <h4 className="text-white text-2xl mt-5">
                                    <strong>로고</strong>
                                </h4>
                                <p className="text-lg text-red-500">
                                    ⚠ 로고를 허락없이 무단으로 수정하거나 변경, 왜곡등 기타 방법으로 수정하는 것을 금지합니다.
                                </p>
                                <Image src={'/api/img?url=https://i.imgur.com/HVICXv3.png'} width={200} height={200} quality={100} alt="logo"/>
                                <h4 className="text-white text-2xl my-5">
                                    🎨<strong>색상</strong>
                                </h4>
                                <div className="w-64 h-32 p-5 flex bg-universe-blue rounded text-white">
                                    <p className="text-xl m-auto"><strong>파랑</strong><br/>
                                        rgb(18,101,192)<br/>
                                        #1565c0</p>
                                </div>
                            </div>
                        </div>
                        <Divider/>
                        <div className="mt-10 p-5">
                            <h3 className="text-3xl text-white font-bold">
                                개발환경
                            </h3>
                            <div className="p-2">
                                <h4 className="text-white text-2xl my-5">
                                    <strong>웹 프레임워크</strong>
                                </h4>
                                <h5 className="text-white text-xl">
                                    - Next.js
                                </h5>
                                <h4 className="text-white text-2xl my-5">
                                    <strong>데이터베이스</strong>
                                </h4>
                                <h5 className="text-white text-xl">
                                    - MongoDB
                                </h5>
                                <h4 className="text-white text-2xl my-5">
                                    <strong>서버</strong>
                                </h4>
                                <h5 className="text-white text-xl">
                                    - Ubuntu
                                </h5>
                                <h4 className="text-white text-2xl mt-5 flex items-center gap-1">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <strong>참고 오픈소스 및 라이센스</strong>
                                </h4>
                                <p className="text-lg text-yellow-500">
                                    참고한 오픈소스중 최고 라이센스인 AGPL-3.0 라이센스에 따라 동일한 라이센스로 공개합니다.
                                </p>
                                <h5 className="text-white text-xl">
                                    - <Link href="https://github.com/koreanbots/core" rel="noreferrer" passHref>
                                            <a target="_blank" className="text-blue-600 hover:underline">
                                                koreanbots/core(AGPL-3.0)
                                            </a>
                                        </Link>{" "}<Link href="https://koreanbots.dev" rel="noreferrer" passHref>
                                            <a target="_blank" className="text-blue-600 hover:underline">
                                                (공식사이트)
                                            </a>
                                        </Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
