import cookie from "cookie";

export const library = [
    'discord.js',
    'Eris',
    'discord.py',
    'pycord',
    'discordcr',
    'Nyxx',
    'Discord.Net',
    'DSharpPlus',
    'Nostrum',
    'coxir',
    'DiscordGo',
    'Discord4J',
    'Javacord',
    'JDA',
    'Discordia',
    'RestCord',
    'Yasmin',
    'disco',
    'discordrb',
    'serenity',
    'SwiftDiscord',
    'Sword',
    '기타',
    '비공개',
]

export const botCategories = [
    // 상위 카테고리
    '관리',
    '뮤직',
    '전적',
    '게임',
    '도박',
    '로깅',
    '빗금 명령어',
    '웹 대시보드',
    '밈',
    '레벨링',
    '유틸리티',
    '대화',
    'NSFW',
    '검색',
    // 검색
    '학교',
    '코로나19',
    // 유틸리티
    '번역',
    // 전적
    '오버워치',
    '리그 오브 레전드',
    '배틀그라운드',
    '마인크래프트'
]
export const BASE_URLs = {
    api: 'https://discord.com/api',
    invite: 'https://discord.gg',
    cdn: 'https://cdn.discordapp.com',
}
export const DiscordEnpoints = {
    Token: BASE_URLs.api + '/oauth2/token',
    Me: BASE_URLs.api + '/v9/users/@me',
    Guilds: BASE_URLs.api + '/v9/users/@me/guilds',
    InviteApplication: (id, perms, scope, redirect="", guild_id="") => `${BASE_URLs.api}/oauth2/authorize?client_id=${id ? id.split(' ')[0] : 'CLIENT_ID'}&permissions=${Object.keys(perms).filter(el => perms[el]).map(el => Number(el)).reduce((prev, curr) => prev + curr, 0)}&scope=${scope ? encodeURI(scope) : 'bot'}${redirect ? `&redirect_uri=${encodeURIComponent(redirect)}` : ''}${guild_id ? `&guild_id=${guild_id}` : ''}`,
    ServerInvite: (code) => `${BASE_URLs.invite}/${code}`,
}
export const GuildPermissions = {
    general: [
        {
            name: '채널 보기',
            flag: 0x00000400
        },
        {
            name: '채널 관리하기',
            flag: 0x00000010,
            twofactor: true
        },
        {
            name: '역할 관리하기',
            flag: 0x10000000,
            twofactor: true
        },
        {
            name: '이모티콘 관리하기',
            flag: 0x40000000,
            twofactor: true
        },
        {
            name: '감사 로그 보기',
            flag: 0x00000080
        },
        {
            name: '웹후크 관리하기',
            flag: 0x20000000,
            twofactor: true
        },
        {
            name: '서버 관리하기',
            flag: 0x00000020,
            twofactor: true
        }
    ],
    membership: [
        {
            name: '초대 코드 만들기',
            flag: 0x00000001
        },
        {
            name: '별명 변경하기',
            flag: 0x04000000
        },
        {
            name: '별명 관리하기',
            flag: 0x08000000
        },
        {
            name: '멤버 추방하기',
            flag: 0x00000002,
            twofactor: true
        },
        {
            name: '멤버 차단하기',
            flag: 0x00000004,
            twofactor: true
        }
    ],
    channel: [
        {
            name: '메세지 보내기',
            flag: 0x00000800
        },
        {
            name: '링크 첨부',
            flag: 0x00004000
        },
        {
            name: '파일 첨부',
            flag: 0x00008000
        },
        {
            name: '반응 추가하기',
            flag: 0x00000040
        },
        {
            name: '외부 이모티콘 사용',
            flag: 0x00040000
        },
        {
            name: '@everyone, @here 모든 역할 멘션하기',
            flag: 0x00020000
        },
        {
            name: '메세지 관리',
            flag: 0x00002000,
            twofactor: true
        },
        {
            name: '메세지 기록 보기',
            flag: 0x00010000
        },
        {
            name: '텍스트 음성 변환 메세지 전송',
            flag: 0x00001000
        },
        {
            name: '빗금 명령어 사용',
            flag: 0x80000000
        }
    ],
    voice: [
        {
            name: '연결',
            flag: 0x00100000
        },
        {
            name: '말하기',
            flag: 0x00200000
        },
        {
            name: '동영상',
            flag: 0x00000200

        },
        {
            name: '음성 감지 사용',
            flag: 0x02000000
        },
        {
            name: '우선 발언권',
            flag: 0x00000100
        },
        {
            name: '멤버들의 마이크 음소거하기',
            flag: 0x00400000
        },
        {
            name: '멤버의 헤드셋 음소거하기',
            flag: 0x00800000
        },
        {
            name: '멤버 이동',
            flag: 0x01000000
        }
    ],
    advanced: [
        {
            name: '관리자',
            flag: 0x8,
            twofactor: true
        }
    ]
}
export const Oauth = {
    discord: (scope) => `https://discord.com/oauth2/authorize?client_id=953110159247433758&scope=${scope}&permissions=0&response_type=code&redirect_uri=http://localhost:3000/api/auth/discord/callback&prompt=none`,
}
export function parseCookie(req){
    if(!req) return {}
    console.log(req.headers)
    return cookie.parse(req.headers.cookie || '')
}
export function generateOauthURL(scope) {
    return Oauth.discord(scope)
}
