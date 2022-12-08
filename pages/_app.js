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
const MyApp=({Component, pageProps, cookie})=> {
    console.log("cookie: ",cookie)
    return (
        <div className="bg-discord-dark">
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
