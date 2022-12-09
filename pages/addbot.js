import dynamic from "next/dynamic";
import MessageBox from "../components/MessageBox";
import Link from "next/link";
import {Form,Formik}from "formik";
import {AddBotSubmitSchema} from "../tool/Yup";
import {botCategories, library} from "../tool/Constants";
import Image from "next/image";
import {MCaptchaWidget}  from "@mcaptcha/react-glue"
import { api } from "../tool/Tools";
const ScrollButton = dynamic(() => import("../components/TopBtn"), {ssr: false});
const Input = dynamic(() => import("../components/Form/Input"));
const CheckBox = dynamic(() => import("../components/Form/CheckBox"));
const Label = dynamic(() => import("../components/Form/Label"));
const Divider = dynamic(() => import("../components/Divider"));
const Select = dynamic(() => import("../components/Form/Select"));
const Selects = dynamic(() => import("../components/Form/Selects"));
const TextArea = dynamic(() => import("../components/Form/TextArea"));
const Markdown = dynamic(() => import("../components/Markdown"));


export default function Addbot(){
    const initialValues = {
        agree: false,
        id: '',
        prefix: '',
        library: '',
        category: [],
        intro: '',
        desc: `<!-- 이 설명을 지우시고 원하시는 설명을 적으셔도 좋습니다! -->
## 봇의 이름은 무엇인가요? 🧐
*Harin*

## 이 봇의 특징들은요? 🤪
- 아주 멋진기능?
- 어디서도 보지못한 기능??`,
    }
    const siteKey = {
        key: 'AZ7REUKHAogC4cQWDBMe3NdxRc8nZxw0'
    }
    const config = { siteKey }
    return(
        <>
            <ScrollButton/>
            <div className="min-h-screen">
                <div className="bg-discord-black">
                    <div className="container mx-auto px-5 py-5">
                        <h1 className="text-4xl text-white font-bold">
                            새로운 봇 추가하기
                        </h1>
                        <p className="text-white text-lg">
                            여러분들만의 봇을 추가해보세요!
                        </p>
                        <Formik initialValues={initialValues}
                                validationSchema={AddBotSubmitSchema}
                                onSubmit={async (values) => {
                                    values.captcha = document.getElementById('mcaptcha__token').value;
                                    const Resp = await api(localStorage.getItem('userToken')).post('bots/submit',{json:values})
                                    if(Resp.ok){
                                        const data = await Resp.json()
                                        console.log(data)
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                            /* you can also use 'auto' behaviour
                                                in place of 'smooth' */
                                        });
                                        alert("성공적으로 등록되었습니다!")
                                        window.location.replace(`/bots/pend/${data.data._id}`)
                                    } else {
                                        alert("등록에 실패하였습니다.")
                                    }
                                }}>
                            {({ errors, touched,
                                  values, isValid, setFieldTouched,
                                  setFieldValue }) => (
                                <Form>
                                    <MessageBox type="warning">
                                        <div className="text-lg">
                                            <strong>봇을 추가하기전 아래의 사항을 꼭! 확인해주세요.</strong>
                                            <li><Link href="/discord"><strong className="text-universe-blue hover:cursor-pointer hover:underline">디스코드서버</strong></Link>에 참여하셨나요?</li>
                                            <li>신청하시려는 봇이 <Link href="/discord"><strong className="text-universe-blue hover:cursor-pointer hover:underline">가이드라인</strong></Link>을 준수하고있나요?</li>
                                            <li>봇 개발자가 두명이상인경우 승인을 받으신뒤 추가하실 수 있습니다.</li>
                                            <li>또한 등록하시게되면 모든 정보가 웹과 API에 공개되며 등록심사중에는 수정 및 취소하실수없습니다.</li>
                                            <p style={{fontSize: '0.8em', margin: '0'}}>위 내용은 <Link href="https://koreanbots.dev" passHref>
                                                <a target="_blank" rel="noreferrer" style={{color:"#3366FF"}} className="hover:underline">한국
                                                    디스코드 리스트</a></Link>의 안내사항을 참고하였습니다.</p>
                                        </div>
                                    </MessageBox>
                                    <Label For="agree" error={errors.agree && touched.agree ? errors.agree : null} grid={false}>
                                        <div className="flex items-center gap-1">
                                            <CheckBox name={'agree'}/>
                                            <strong className="text-universe-blue text-sm">위사항에 동의하십니까?</strong>
                                        </div>
                                    </Label>
                                    <Divider/>
                                    <Label For='id' label='봇 ID' labelDesc='봇의 클라이언트 ID를 의미합니다.' error={errors.id && touched.id ? errors.id : null} short required>
                                        <Input name='id' placeholder='653534001742741552' />
                                    </Label>
                                    <Label For='prefix' label='접두사' labelDesc='봇의 사용시 앞 쪽에 붙은 기호를 의미합니다. (Prefix)' error={errors.prefix && touched.prefix ? errors.prefix : null} short required>
                                        <Input name='prefix' placeholder='!' disabled={values.category.includes('빗금 명령어')} />
                                    </Label>
                                    <Label For='library' label='라이브러리' labelDesc='봇에 사용된 라이브러리를 선택해주세요. 해당되는 라이브러리가 없다면 기타를 선택해주세요.' short required error={errors.library && touched.library ? errors.library : null}>
                                        <Select options={library.map(el=> ({ label: el, value: el }))} handleChange={(value) => setFieldValue('library', value.value)} handleTouch={() => setFieldTouched('library', true)} />
                                    </Label>
                                    <Label For='category' label='카테고리' labelDesc='봇에 해당되는 카테고리를 선택해주세요' required error={errors.category && touched.category ? errors.category : null}>
                                        <Selects options={botCategories.map(el=> ({ label: el, value: el }))} handleChange={(value) => {
                                            setFieldValue('category', value.map(v=> v.value))
                                            if(value.map(v=> v.value
                                            ).includes('빗금 명령어')) {
                                                setFieldValue('prefix', '빗금 명령어( / )')
                                            } else {
                                                setFieldValue('prefix', '')
                                            }
                                        }} handleTouch={() => setFieldTouched('category', true)} values={values.category} setValues={(value) => setFieldValue('category', value)} />
                                        <span className='text-gray-400 mt-1 text-sm'>봇 카드에는 앞 3개의 카테고리만 표시됩니다. 드래그하여 카테고리를 정렬하세요. <strong>반드시 해당되는 카테고리만 선택해주세요.</strong></span>
                                    </Label>
                                    {
                                        values.category.includes('빗금 명령어') && <MessageBox type='warning'>
                                            <h2 className='text-lg font-semibold'>해당 봇은 빗금 명령어(Slash Command) 카테고리가 선택되었습니다.</h2>
                                            <p>접두사 기입란이 자동으로 비활성화되었습니다.</p>
                                        </MessageBox>
                                    }
                                    <Divider />
                                    <Label For='website' label='웹사이트' labelDesc='봇의 웹사이트를 작성해주세요.' error={errors.website && touched.website ? errors.website : null}>
                                        <Input name='website' placeholder='https://koreanbots.dev' />
                                    </Label>
                                    <Label For='git' label='Git URL' labelDesc='봇 소스코드의 Git 주소를 입력해주세요. (오픈소스인 경우)' error={errors.git && touched.git ? errors.git : null}>
                                        <Input name='git' placeholder='https://github.com/koreanbots/koreanbots'/>
                                    </Label>
                                    <Label For='inviteLink' label='초대링크' labelDesc='봇의 초대링크입니다. 비워두시면 자동으로 생성합니다.' error={errors.url && touched.url ? errors.url : null}>
                                        <Input name='url' placeholder='https://discord.com/oauth2/authorize?client_id=653534001742741552&scope=bot&permissions=0' />
                                        <span className='text-gray-400 mt-1 text-sm'>
                                            <a className='text-blue-500 hover:text-blue-400' onClick={()=>{
                                                var popupWin = window.open(`/invitegen${values?.id && `?botid=${values.id}`}`,"_blank","width=1700,height=800")
                                                try {
                                                    popupWin.focus();
                                                } catch(e){
                                                    alert( "팝업이 차단되어 있습니다." );
                                                }
                                            }}>
                                                이곳
                                            </a>에서 초대링크를 생성하실 수 있습니다!
                                        </span>
                                    </Label>
                                    <Label For='discord' label='지원 디스코드 서버' labelDesc='봇의 지원 디스코드 서버를 입력해주세요.(봇에 대해 도움을 받을 수 있는 공간입니다.)' error={errors.discord && touched.discord ? errors.discord : null} short>
                                        <div className='flex items-center text-white'>
                                            discord.gg/<Input name='discord' placeholder='JEh53MQ' />
                                        </div>
                                    </Label>
                                    <Divider />
                                    <Label For='intro' label='봇 소개' labelDesc='봇을 소개할 수 있는 간단한 설명을 적어주세요. (최대 60자)' error={errors.intro && touched.intro ? errors.intro : null} required>
                                        <Input name='intro' placeholder='국내 봇을 한 곳에서.' />
                                    </Label>
                                    <Label For='intro' label='봇 설명' labelDesc={<>봇을 자세하게 설명해주세요! (최대 1500자)<br/>마크다운을 지원합니다!</>} error={errors.desc && touched.desc ? errors.desc : null} required>
                                        <TextArea max={1500} name='desc' placeholder='봇에 대해 최대한 자세히 설명해주세요!' value={values.desc} setValue={(value) => setFieldValue('desc', value)} />
                                    </Label>
                                    <Label For='preview' label='설명 미리보기' labelDesc='다음 결과는 실제와 다를 수 있습니다.'>
                                        <>
                                            <Markdown text={values.desc} />
                                        </>
                                    </Label>
                                    <Divider />
                                    <p className='text-white mt-2 mb-5'>
                                        <span className='text-red-500 font-semibold'> *</span> = 필수 항목
                                    </p>
                                    {
                                        !isValid && <div className='my-1 text-red-500 text-xs font-light'>누락되거나 잘못된 항목이 있습니다. 다시 확인해주세요.</div>
                                    }
                                    <div className="p-2 md:flex md:gap-2 md:items-center md:justify-end">
                                        <div className="bg-white h-fit rounded">
                                            <MCaptchaWidget {...config}/>
                                        </div>
                                        <button type="submit"
                                                className="gap-2 w-full mt-2 md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={()=>{
                                                    if(!isValid) window.scrollTo({ top: 0 , behavior: 'smooth' });
                                                }}>
                                            제출하기
                                            <Image src="/svg/submit.svg" width={20} height={20} alt={'submit'} />
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}
