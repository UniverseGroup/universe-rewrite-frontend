import {useState} from 'react';
import { Button } from './TopBtnStyles';
import Image from "next/image";
const ScrollButton = () =>{

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        }
        else if (scrolled <= 300){
            setVisible(false)
        }
    };

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
                in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button>
            {
                visible && (<div className="mx-1"><Image src="/svg/up.svg" width={50} height={50} onClick={scrollToTop} alt={"upbtn"}/></div>)
            }
        </Button>
    );
}

export default ScrollButton;
