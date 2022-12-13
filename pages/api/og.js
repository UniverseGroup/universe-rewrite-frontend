import { ImageResponse } from "@vercel/og";

export const config = {
    runtime: 'experimental-edge'
}

export default function handler(req){
    try{
        const {searchParams} = req.nextUrl
        const title = searchParams.get('title')
        const description = searchParams.get('description')
        const image = 'https://cdn.discordapp.com/avatars/'+searchParams.get('image')
        const hearts = searchParams.get('hearts')
        const guilds = searchParams.get('guilds')
        console.log(searchParams)
        return new ImageResponse(
            (
                // <div style={{
                //     width: '100%',
                //     height: '100%',
                //     backgroundColor: '#1565c0',
                //     padding: '10px'
                // }}>
                //     <img src={image} className="rounded-full h-20 w-20"/>
                //     <div className="my-2">
                //         <h1 className="text-white text-2xl font-bold">{title}</h1>
                //         <p className="text-white text-sm">{description}</p>
                //     </div>
                //     <div className="flex gap-2">
                //         <div className="flex gap-1 items-center">
                //             ❤️
                //             <p className="text-white text-sm">{hearts}</p>
                //         </div>
                //         <div className="flex gap-1 items-center">
                //             📡
                //             <p className="text-white text-sm">{guilds}</p>
                //         </div>
                //     </div>
                // </div>
                <div
                style={{
                  fontSize: 40,
                  color: 'black',
                  background: '#1565c0',
                  width: '100%',
                  height: '100%',
                  padding: '90px 90px',
                  display: 'flex',
                    flexDirection: 'column',
                }}
              >
                <div

                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image} alt={"profileImg"}
                            style={{
                                width: 290,
                                height: 290,
                                borderRadius: '100%',
                            }}/>
                        <p style={{fontSize:'90px',marginBottom:'0px',color:"white",display:'flex',flexDirection:'column',marginLeft:'15px',textAlign:'left'}}>
                            {title}
                            <p style={{fontSize:'70px',marginTop:'0px',color:"white"}}>
                                {description}
                            </p>
                        </p>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',marginTop:'1px',marginBottom:'10px'}}>
                        <p style={{fontSize:'80px',margin:'-2px',color:"white",display:'flex',flexDirection:'column'}}>
                            ❤️•{hearts}
                            <p style={{fontSize:'60px',margin:'-2px',color:"white"}}>
                                추천수
                            </p>
                        </p>
                        <br/>
                        <p style={{fontSize:'80px',margin:'-2px',color:"white",display:'flex',flexDirection:'column',marginTop:'10px'}}>
                            📡•{guilds}
                            <p style={{fontSize:'60px',margin:'-2px',color:"white"}}>
                                길드수
                            </p>
                        </p>
                    </div>
                     {/* <h1 style={{
                                fontSize: 40,
                                fontWeight: 'bold',
                                color: 'white',
                         }}>
                            {title}<br/>
                            <p style={{
                                fontSize: 20,
                                color: 'white',
                            }}>
                                {description}
                            </p>
                    </h1> */}
                     {/* <div className="flex gap-2">
                         <div className="flex gap-1 items-center">
                            ❤️
                           <p className="text-white text-sm">{hearts}</p>
                      </div>
                       <div className="flex gap-1 items-center">
                            📡
                            <p className="text-white text-sm">{guilds}</p>
                        </div>
                    </div> */}
              </div>
            ),
                {
                    width:2048,
                    height:1170,
                    emoji: 'twemoji',
                }
        )
    } catch (e) {
        return new Response(e.stack || e,{
      status: 500,
    })
    }
}