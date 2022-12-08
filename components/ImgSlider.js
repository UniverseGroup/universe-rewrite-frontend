import {Fade} from 'react-slideshow-image';
import Image from "next/image";
import Link from "next/link";
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
    {
        imgurl: '/banner/1.png',
        url: '/'
    },
    {
        imgurl: '/banner/2.png',
        url: '/'
    },
];

const ImgSlider = () => {
    return (
        <div className="slide-container">
            <Fade autoplay={true} duration={2500} indicators={true}>
                {fadeImages.map((fadeImage, index) => (
                    <div className="each-fade" key={index}>
                        <div className="image-container">
                            <Link href={fadeImage.url} passHref>
                                <a className="hover:cursor-pointer h-full flex m-auto justify-center">
                                    <img src={fadeImage.imgurl} alt={`${index}_img`}/>
                                </a>
                            </Link>
                        </div>
                        <p className="bg-universe-blue p-2 w-fit h-fit rounded-md text-white text-xl relative bottom-10 z-40" style={{right:"-90%"}}>
                            광고
                        </p>
                    </div>
                ))}
            </Fade>
        </div>
    )
}
export default ImgSlider;
