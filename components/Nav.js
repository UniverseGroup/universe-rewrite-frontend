import {useEffect, useState} from "react";
import Divider from "./Divider";
import Link from "next/link";
import {DiscordEnpoints} from "../tool/Constants";
import {useRouter} from "next/router";
import {decodeJwt, redirectTo,getProfileImg} from "../tool/Tools";
import Image from "next/image";
const Nav = ({token}) => {
    const [userCache, setUserCache] = useState({})
    const [MobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [AddMenuOpen, setAddMenuOpen] = useState(false);
    const [ProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const router = useRouter()
    const logged = userCache?.id && userCache.version === 1
    useEffect(() => {
        try {
            const decodingJwt = decodeJwt(token || localStorage.getItem("userToken"))
            console.log('Nav', decodingJwt)

            async function getUser() {
                try {
                    const fetchApi = await fetch(DiscordEnpoints.Me, {
                        headers: {
                            Authorization: `Bearer ${decodingJwt.access_token}`,
                            'Content-Type': 'application/json'
                        },
                        method: 'GET'
                    })
                    if (!fetchApi.ok) return
                    const fetchResp = await fetchApi.json()
                    console.log("fetch", fetchResp)
                    const UserData = {
                        id: fetchResp.id,
                        username: fetchResp.username,
                        tag: fetchResp.discriminator,
                        avatar: getProfileImg(fetchResp.id,fetchResp.avatar),
                        version: 1
                    }
                    localStorage.setItem('userCache', JSON.stringify(UserData))
                    setUserCache(UserData)
                } catch {
                    setUserCache(null)
                }

            }

            getUser()
        } catch (e) {
            console.log(e)
            setUserCache(null)
        }
    }, [token])
    return (

        <nav
            className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          md:py-0
          p-4
          text-lg text-gray-700
          bg-discord-black
          sticky top-0 z-50
          shadow-md
        "
        >
            <Link href="/" passHref><a className="text-universe-blue font-bold text-2xl flex items-center gap-1">
                <Image src={"/api/img?url=https://i.imgur.com/HVICXv3.png"} width={50} height={50} alt="logo" className="rounded-full" quality={100}/>UNIVERSE
            </a></Link>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer md:hidden block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setMobileMenuOpen(!MobileMenuOpen)}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>

            <div className={`${!MobileMenuOpen && 'hidden'} w-full md:flex md:items-center md:w-auto p-2`} id="menu">
                <ul
                    className="
              pt-4
              items-center
              text-base text-gray-400
              md:flex
              md:justify-between
              md:pt-0
              gap-2"
                >
                    <li>
                        <Link href={"/about"} passHref><a
                            className="md:p-4 p-2 block transition duration-300 ease-in-out hover:text-purple-400 hover:bg-discord-dark-hover rounded-lg"
                        >About</a></Link>
                    </li>
                    <li>
                        <a className="md:p-4 p-2 block transition duration-300 ease-in-out hover:text-purple-400 hover:bg-discord-dark-hover rounded-lg"
                           href="#"
                        >Pricing</a>
                    </li>
                    <li>
                        <a className="md:p-4 p-2 block transition duration-300 ease-in-out hover:text-purple-400 hover:bg-discord-dark-hover rounded-lg"
                           href="#"
                        >Customers</a>
                    </li>
                    <li onFocus={() => setAddMenuOpen(true)}
                        onMouseOver={() => setAddMenuOpen(true)}
                        onMouseOut={() => setAddMenuOpen(false)}
                        onBlur={() => setAddMenuOpen(false)}
                        className='flex items-center'>
                        <span
                            className="md:p-4 p-2 block transition duration-300 ease-in-out hover:text-purple-400 hover:bg-discord-dark-hover focus:text-purple-400 focus:bg-discord-dark-hover rounded-lg"
                        >Add</span>
                        <div
                            className={`absolute mt-28 md:mt-16 top-0 border border-discord-black ${AddMenuOpen ? "block" : "hidden"} md:p-4 p-2 bg-discord-dark-hover rounded shadow-md`}>
                            <ul className="flex flex-col items-center">
                                <li>
                                    <Link href="/addbot" passHref><a
                                        className=" block transition duration-300 ease-in-out hover:text-purple-400 hover:bg-discord-dark-hover focus:text-purple-400 focus:bg-discord-dark-hover rounded-lg"
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            setAddMenuOpen(!AddMenuOpen)
                                        }}
                                    >
                                        봇 추가
                                    </a></Link>
                                </li>
                                <Divider/>
                                <li>
                                    <a className="block transition duration-300 ease-in-out hover:text-purple-400 hover:bg-discord-dark-hover focus:text-purple-400 focus:bg-discord-dark-hover rounded-lg"
                                       onClick={() => setAddMenuOpen(!AddMenuOpen)}
                                    >
                                        서버 추가
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        {
                            logged ? <div onFocus={() => setProfileMenuOpen(true)}
                                          onMouseOver={() => setProfileMenuOpen(true)}
                                          onMouseOut={() => setProfileMenuOpen(false)}
                                          onBlur={() => setProfileMenuOpen(false)}
                                          className='flex items-center'>
                                        <span
                                            className="md:p-4 p-2 flex items-center font-bold gap-1 block transition duration-300 ease-in-out hover:text-purple-400 hover:bg-discord-dark-hover focus:text-purple-400 focus:bg-discord-dark-hover rounded-lg"
                                        >
                                            <Image src={`/api/img?url=${userCache.avatar}`} width={35} height={35} loading="lazy" className="rounded-full" alt={userCache.avatar}/>
                                            {userCache.username}#{userCache.tag}
                                        </span>
                                                    <div
                                                        className={`absolute mt-28 md:mt-16 top-0 border border-discord-black ${ProfileMenuOpen ? "block" : "hidden"} md:p-4 p-2 bg-discord-dark-hover rounded shadow-md`}>
                                                        <ul className="flex flex-col items-center">
                                                            <li>
                                                                <Link href="/addbot" passHref><a
                                                                    className=" block transition duration-300 ease-in-out hover:text-purple-400 hover:bg-discord-dark-hover focus:text-purple-400 focus:bg-discord-dark-hover rounded-lg"
                                                                    onClick={() => {
                                                                        setMobileMenuOpen(false);
                                                                        setProfileMenuOpen(!ProfileMenuOpen)
                                                                    }}
                                                                >
                                                                    프로필
                                                                </a></Link>
                                                            </li>
                                                            <Divider/>
                                                            <li>
                                                                <a className="block transition duration-300 ease-in-out cursor-pointer hover:text-purple-400 hover:bg-discord-dark-hover focus:text-purple-400 focus:bg-discord-dark-hover rounded-lg"
                                                                   onClick={() => setProfileMenuOpen(!ProfileMenuOpen)}
                                                                >
                                                                    대시보드
                                                                </a>
                                                            </li>
                                                            <Divider/>
                                                            <li>
                                                                <a className="block transition duration-300 text-red-600 ease-in-out cursor-pointer hover:text-red-400 hover:bg-discord-dark-hover focus:text-red-400 focus:bg-discord-dark-hover rounded-lg"
                                                                   onClick={()=> {
                                                                       setProfileMenuOpen(!ProfileMenuOpen);
                                                                       redirectTo(router, "/api/auth/discord/logout")
                                                                   }}
                                                                >
                                                                    로그아웃
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                </div>
                                : <a
                                    className="md:p-4 p-2 block text-gray-200 rounded-md hover:text-white bg-discord-blurple hover:cursor-pointer"
                                    onClick={() => redirectTo(router, "/api/auth/discord")}
                                >Login</a>
                        }

                    </li>
                </ul>
            </div>
        </nav>

    )
}
export default Nav;
