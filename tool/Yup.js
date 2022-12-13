import * as Yup from 'yup'
import YupKorean from 'yup-locales-ko'
import {library,botCategories} from "./Constants";
import {HTTPProtocol, ID, Prefix, Vanity,Url} from "./Regex";
import { reportcategories } from './Constants';
Yup.setLocale(YupKorean)
Yup.addMethod(Yup.array, 'unique', function(message, mapper = a => a) {
    return this.test('unique', message || 'array must be unique', function(list) {
        return list.length === new Set(list.map(mapper)).size
    })
})
export const AddBotSubmitSchema = Yup.object({
    agree: Yup.boolean()
        .oneOf([true], '상단의 체크박스를 클릭해주세요.')
        .required('상단의 체크박스를 클릭해주세요.'),
    id: Yup.string()
        .matches(ID, '올바른 봇 ID를 입력해주세요.')
        .required('봇 ID는 필수 항목입니다.'),
    prefix: Yup.string()
        .matches(Prefix, '접두사는 띄어쓰기로 시작할 수 없습니다.')
        .min(1, '접두사는 최소 1자여야합니다.')
        .max(32, '접두사는 최대 32자까지만 가능합니다.')
        .required('접두사는 필수 항목입니다.'),
    library: Yup.string()
        .oneOf(library)
        .required('라이브러리는 필수 항목입니다.'),
    website: Yup.string()
        .matches(HTTPProtocol, 'http:// 또는 https:// 로 시작해야합니다.')
        .matches(Url, '올바른 웹사이트 URL을 입력해주세요.')
        .max(64, 'URL은 최대 64자까지만 가능합니다.')
        .nullable(),
    url: Yup.string()
        .matches(HTTPProtocol, 'http:// 또는 https:// 로 시작해야합니다.')
        .matches(Url, '올바른 초대링크 URL을 입력해주세요.')
        .max(612, 'URL은 최대 612자까지만 가능합니다.')
        .nullable(),
    git: Yup.string()
        .matches(HTTPProtocol, 'http:// 또는 https:// 로 시작해야합니다.')
        .matches(Url, '올바른 깃 URL을 입력해주세요.')
        .max(64, 'URL은 최대 64자까지만 가능합니다.')
        .nullable(),
    discord: Yup.string()
        .matches(Vanity, '디스코드 초대코드 형식을 지켜주세요.')
        .min(2, '지원 디스코드는 최소 2자여야합니다.')
        .max(32, '지원 디스코드는 최대 32자까지만 가능합니다.')
        .nullable(),
    category: Yup.array(Yup.string().oneOf(botCategories))
        .min(1, '최소 한 개의 카테고리를 선택해주세요.')
        .unique('카테고리는 중복될 수 없습니다.')
        .required('카테고리는 필수 항목입니다.'),
    intro: Yup.string()
        .min(2, '봇 소개는 최소 2자여야합니다.')
        .max(60, '봇 소개는 최대 60자여야합니다.')
        .required('봇 소개는 필수 항목입니다.'),
    desc: Yup.string()
        .min(100, '봇 설명은 최소 100자여야합니다.')
        .max(1500, '봇 설명은 최대 1500자여야합니다.')
        .required('봇 설명은 필수 항목입니다.'),
})

export const ReportBotSchema = Yup.object(
    {
        category: Yup.mixed().oneOf(reportcategories,'카테고리는 필수 항목입니다.').required('카테고리는 필수 항목입니다.'),
        description: Yup.string().min(10, '신고 내용은 최소 10자여야합니다.').max(1000, '신고 내용은 최대 1000자여야합니다.').required('신고 내용은 필수 항목입니다.'),
    }
)