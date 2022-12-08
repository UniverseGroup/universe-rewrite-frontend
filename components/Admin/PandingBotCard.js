import { Card, Metric, Text,Flex,Footer } from "@tremor/react";
import Image from "next/image";
import {useEffect} from "react";
import ClipboardJS from "clipboard";
export default ({value,index}) => {
    useEffect(() => {
        var clipboardId = new ClipboardJS('.copyid');
        clipboardId.on('success', function(e) {
            e.trigger.innerHTML = "복사됨";
            e.trigger.classList.remove("bg-blue-600");
            e.trigger.classList.add("bg-green-500");
            setTimeout(() => {
                e.trigger.innerHTML = "복사";
                e.trigger.classList.remove("bg-green-500");
                e.trigger.classList.add("bg-blue-600");
            }, 2000);
            e.clearSelection()
        })
        clipboardId.on('error', function(e) {
            console.log(e);
        })
    },[]);
    return(
       <Card maxWidth="max-w-2xl" decoration="top" decorationColor="indigo">
            <div className="flex items-center">
                <Image className="rounded-full" width={"100px"} height={"100px"}
                           src="/api/img?url=https://cdn.discordapp.com/avatars/893841721958469703/d1d394c5cbe6b81ad4c18b8502f64d07.webp"
                           alt="img" placeholder="blur"
                           blurDataURL="/api/img?url=https://cdn.discordapp.com/avatars/893841721958469703/d1d394c5cbe6b81ad4c18b8502f64d07.webp"
                            loading="lazy"/>
                <div>
                    <Text>{value.name}</Text>
                    <div className="p-2 rounded-lg bg-gray-100 flex items-center w-fit">
                        <p>{value.id}</p>
                        <button data-clipboard-text={value.id}
                                className="copyid w-fit px-2 py-1 rounded-lg bg-blue-600
                                hover:bg-blue-800 text-white ml-2">
                            복사
                        </button>
                    </div>
                </div>
            </div>
            <Text>신청자</Text>
            <Metric>{value.submitusername}</Metric>
            <Text>접두사</Text>
            <Metric>{value.prefix}</Metric>
            <Text>라이브러리</Text>
            <Metric>{value.library}</Metric>
            <Text>카테고리</Text>
            <Metric>{value.category.join(', ')}</Metric>
            <Footer height="h-16">
                <Flex justifyContent="justify-end">
                    <Text>Pending Num : {index+1}</Text>
                </Flex>
            </Footer>
        </Card> 
    )
  
};
