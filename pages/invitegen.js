import dynamic from "next/dynamic";
import {Formik, Form} from 'formik'
import {useState} from 'react'
import {DiscordEnpoints, GuildPermissions} from '../tool/Constants'

const ScrollButton = dynamic(() => import("../components/TopBtn"), {ssr: false});
const Input = dynamic(() => import('../components/Form/Input'))
export default function Invitegen({query}) {
    const [value, setValue] = useState({})
    const Perm = ({name, perm, yellow}) => {
        return <li>
            <label className='inline-flex items-center py-1'>
                <input
                    className='border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 text-discord-blurple bg-gray-300 h-5 w-5 rounded'
                    type='checkbox' checked={value[perm]} onChange={() => {
                    setValue({...value, [perm]: !value[perm]})
                }}/>
                <span className={`ml-2.5 text-lg ${yellow ? 'text-yellow-500' : ''}`}>{name}</span>
            </label>
        </li>

    }
    return (
        <>
            <ScrollButton/>
            <div className="min-h-screen">
                <div className="bg-discord-black">
                    <div className="container mx-auto px-5 py-5 text-white">
                        <h1 className='text-4xl font-bold mt-2 mb-4'>봇 초대링크 생성기</h1>
                        <div
                            className='text-2xl font-bold inline-flex items-center'>권한: {Object.keys(value).filter(el => value[el]).map(el => Number(el)).reduce((prev, curr) => prev + curr, 0)}
                            <span
                                className='ml-2 text-lg font-semibold'>= {Object.keys(value).filter(el => value[el]).map(el => `0x${Number(el).toString(16)}`).join(' + ')}</span>
                        </div>
                        <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2'>
                            <div>
                                <h2 className='text-2xl font-bold'>일반 권한</h2>
                                <ul>
                                    {
                                        GuildPermissions.general.map(el => <Perm key={el.name} name={el.name}
                                                                                 perm={el.flag} yellow={el.twofactor}/>)
                                    }
                                </ul>

                            </div>
                            <div>
                                <h2 className='text-2xl font-bold'>멤버쉽 권한</h2>
                                <ul>
                                    {
                                        GuildPermissions.membership.map(el => <Perm key={el.name} name={el.name}
                                                                                    perm={el.flag}
                                                                                    yellow={el.twofactor}/>)
                                    }
                                </ul>
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold'>채팅 채널 권한</h2>
                                <ul>
                                    {
                                        GuildPermissions.channel.map(el => <Perm key={el.name} name={el.name}
                                                                                 perm={el.flag} yellow={el.twofactor}/>)
                                    }
                                </ul>
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold'>음성 채널 권한</h2>
                                <ul>
                                    {
                                        GuildPermissions.voice.map(el => <Perm key={el.name} name={el.name}
                                                                               perm={el.flag}/>)
                                    }
                                </ul>
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold'>고급 권한</h2>
                                <ul>
                                    {
                                        GuildPermissions.advanced.map(el => <Perm key={el.name} name={el.name}
                                                                                  perm={el.flag}
                                                                                  yellow={el.twofactor}/>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='py-10'>
                            <span className='text-yellow-500'>노란색 = 서버에 2단계 인증 필수가 활성화되어있다면, 봇 소유자는 <a
                                href='https://support.discord.com/hc/ko/articles/219576828-2단계-인증-설정하기'>2단계 인증</a>이 완료되어있어야합니다.</span>
                        </div>
                        <Formik onSubmit={() => console.log('Pong?')} initialValues={{
                            id: query.botid?.toString() || '',
                            scope: 'bot',
                            redirect: ''
                        }}>
                            {
                                ({values, setFieldValue}) => (
                                    <Form>
                                        <div className='grid gap-3 lg:grid-cols-4'>
                                            <div>
                                                <h6>봇 ID</h6>
                                                <span className='text-gray-400'>클라이언트 아이디를 입력해주세요.</span>
                                                <Input name='id' placeholder='653534001742741552'/>
                                            </div>
                                            <div>
                                                <h6>스코프 (Scope)</h6>
                                                <button
                                                    onClick={() => setFieldValue('scope', 'bot applications.commands')}
                                                    className='text-blue-500 hover:text-blue-400'>빗금 명령어(Slash Command)
                                                    봇인가요?
                                                </button>
                                                <Input name='scope' placeholder='bot'/>
                                            </div>
                                            <div>
                                                <h6>리다이랙트 URL</h6>
                                                <span className='text-gray-400'>초대완료 후 리다이랙트할 URL입니다.</span>
                                                <Input name='redirect' placeholder='(선택사항)'/>
                                            </div>
                                        </div>
                                        <div className='mt-2'>
                                            초대링크: <a rel='noreferrer' target='_blank'
                                                     href={values.id ? DiscordEnpoints.InviteApplication(values.id, value, values.scope, values.redirect) : null}
                                                     className='cursor-pointer text-blue-500 hover:text-blue-400'>{DiscordEnpoints.InviteApplication(values.id, value, values.scope, values.redirect)}</a>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}
export const getServerSideProps = async (ctx) => {
    return {
        props: {
            query: ctx.query
        }
    }
}
