import "../styles/Markdown.css"
import '../styles/globals.css'
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import NextProgress from "next-progress";
import 'animate.css';
import App from "next/app";
import {parseCookie} from "../tool/Constants";
import "../styles/odometer.css"
import '@tremor/react/dist/esm/tremor.css';
import { DefaultSeo } from "next-seo";
const MyApp=({Component, pageProps, cookie})=> {
    console.log("cookie: ",cookie)
    return (
        <div className="bg-discord-dark">
            <DefaultSeo
                titleTemplate="%s | UNIVERSE"
                defaultTitle="UNIVERSE"
                description="다양한 봇과 서버가 모여 만들어진 공간."
                openGraph={{
                    title: "UNIVERSE",
                    type: "website",
                    locale: "ko_KR",
                    url: "https://discordbotlist.kr/",
                    siteName: "UNIVERSE",
                    description: "다양한 봇과 서버가 모여 만들어진 공간.",
                    images: [
                        {
                            url: "/logo.png",
                            width: 300,
                            height: 300,
                            alt: "Logo",
                        },
                    ],
                }}
                themeColor="#1565c0"
            />
            <NextProgress options={{ showSpinner: false }}/>
            <Nav token={cookie.token}/>
          <Component {...pageProps} />
            <Footer />
        </div>
    )
}
MyApp.getInitialProps = async (appCtx) => {
    const appProps = await App.getInitialProps(appCtx)
    const parsed = parseCookie(appCtx.ctx.req)
    return {
        ...appProps,
        cookie: parsed
    }
}
export default MyApp
