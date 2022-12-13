import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import MessageBox from "../../../components/MessageBox";
import { Field,Form,Formik } from 'formik';
import { ReportBotSchema } from '../../../tool/Yup';
import {reportcategories} from '../../../tool/Constants';
import { api, botApi } from '../../../tool/Tools';
import Image from 'next/image';
import Link from 'next/link';
const Divider = dynamic(() => import("../../../components/Divider"));
const TextArea = dynamic(() => import("../../../components/Form/TextArea"));
const BotReportPage = ({ bot }) => {
    console.log(bot);
    return (
        <>
            <NextSeo
                title={bot.name + " 신고" || "Unknown" }
                description={bot.name + " 신고하기" || "Unknown"}
                twitter={{
					cardType: 'summary_large_image'
				}}
                robotsProps={{
                    maxImagePreview: 'large',
                    noarchive: true,
                }}
            />
            <div className="min-h-screen">
                <div className="bg-discord-black">
                    <div className="container mx-auto px-5 py-5 text-white">
                        <Link href={`/bots/${bot.id}`}>
                            <div className="w-fit px-2 flex items-center my-10 gap-2 hover:underline hover:underline-offset-4 hover:cursor-pointer">
                                <Image src="/svg/back.svg" width={20} height={20} alt="back" loading={"lazy"}/>
                                <p className='text-[#1565c0] text-md font-light'>{bot.name}(으)로 되돌아가기</p>
                            </div>
                        </Link>
                        <h1 className="text-4xl font-bold">{bot.name}#{bot.discriminator} 신고하기</h1>
                        <p className="text-gray-400">신고하시는 봇은 신고 후 24시간 이내에 검토됩니다.</p>
                        <Divider />
                        <Formik onSubmit={async (values) => {
                                console.log(values)
                                try{
                                    values.botid = bot.id
                                    const res = await api(localStorage.getItem('userToken')).post("bots/report",{json:values})
                                    const data = await res.json()
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                        /* you can also use 'auto' behaviour
                                            in place of 'smooth' */
                                    });
                                    alert("성공적으로 등록되었습니다!")
                                    window.location.replace(`/bots/${data.data.botid}`) 
                                } catch(e) {
                                    console.log(e)
                                    alert("오류가 발생했습니다.")
                                    window.location.reload()
                                }
                                
                            }
                        }
                        validationSchema={ReportBotSchema}
                        initialValues={{
                            category:null,
                            description:""
                        }}>   
                            {
                                ({ errors, touched, values, setFieldValue }) => (
                                    <Form>
                                        <p className="text-gray-50 text-lg">아래내역중 해당하는 사항을 선택해 신고해주세요.</p>
                                        {
                                            reportcategories.map((category) => (
                                                <div key={category} className="flex items-center gap-2 text-red-400">
                                                    <label htmlFor={category}>
                                                        <Field type="radio" name="category" id={category} value={category} className='mr-1.5'/>
                                                        {category}
                                                    </label>
                                                </div>
                                            ))
                                        }
                                        <p className='mt-1 text-red-600 text-xl font-thin'>{errors.category && touched.category?errors.category:null}</p>
                                        {
                                            values.category === "괴롭힘 혹은 모욕, 명예훼손등의 언어폭력" && (
                                                <MessageBox type="info" title="경고">
                                                    <p className='text-2xl text-orange-600 font-bold'>
                                                        생명의 위협이나 심각한 상처를 입힐 수 있는 언어폭력을 당하셨나요?
                                                    </p>
                                                    <p className='text-black'>
                                                        당신은 소중한 사람이며, 당신의 안전을 우선시해야합니다.
                                                    </p>
                                                    <p className='mt-2 text-black font-bold'>
                                                        24시간 전화 상담
                                                    </p>
                                                    <li>
                                                        <a href="tel:1393" className='text-black'>자살예방상담전화 : 1393</a>
                                                    </li>
                                                    <li>
                                                        <a href="tel:1388" className='text-black'>청소년전화 : 1388</a>
                                                    </li>
                                                    <li>
                                                        <a href="tel:1588-9191" className='text-black'>한국생명의전화 : 1588-9191</a>
                                                    </li>
                                                    <li>
                                                        <a href="tel:1588-0199" className='text-black'>정신건강상담전화 : 1588-0199</a>
                                                    </li>
                                                </MessageBox>
                                            )
                                        }
                                        {
                                            values.category && (
                                                <>
                                                    <p className="text-gray-50 text-lg mt-5">신고내용</p>
                                                    <TextArea name='description' placeholder='신고할 사항에 대해 최대한 자세하게 설명해주세요.' value={values.description} setValue={(value) => setFieldValue('description', value)} />
                                                    <p className='mt-1 text-red-600 text-xl font-thin'>{errors.description && touched.description?errors.description:null}</p>
                                                </>
                                            )
                                        }
                                        <div className='flex justify-end'>
                                            <button type="submit" className='mt-5 bg-discord-blurple text-white p-2 rounded-md w-full'>
                                                신고하기
                                            </button> 
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

export async function getServerSideProps({query}) {
    const {id} = query;
    const res = await botApi().get(`members`,{
        searchParams: {
            id: id
        }
    }).json();
    return {
        props: {
            bot: JSON.parse(JSON.stringify(res))
        }
    }
}


export default BotReportPage;