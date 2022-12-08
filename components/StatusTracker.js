import {
    Card,
    Title,
    Tracking,
    TrackingBlock,
    Flex,
    Text,
  } from "@tremor/react";
  
const statusStyles = {
    "온라인": "emerald",
    "다른용무중": "rose",
    "오프라인": "gray",
    "자리비움": "amber",
    "Unknown": "stone",
};

const data = [
    { id: 1, status: "온라인" },
    { id: 2, status: "온라인" },
    { id: 3, status: "온라인" },
    { id: 4, status: "온라인" },
    { id: 5, status: "온라인" },
    { id: 6, status: "온라인" },
    { id: 7, status: "온라인" },
    { id: 8, status: "온라인" },
    { id: 9, status: "온라인" },
    { id: 10, status: "온라인" },
    { id: 11, status: "온라인" },
    { id: 12, status: "온라인" },
    { id: 13, status: "온라인" },
    { id: 14, status: "온라인" },
    { id: 15, status: "오프라인" },
    { id: 16, status: "온라인" },
    { id: 17, status: "온라인" },
    { id: 18, status: "온라인" },
    { id: 19, status: "온라인" },
    { id: 20, status: "다른용무중" },
    { id: 21, status: "온라인" },
    { id: 22, status: "온라인" },
    { id: 23, status: "온라인" },
    { id: 24, status: "자리비움" },
    { id: 25, status: "온라인" },
    { id: 26, status: "온라인" },
    { id: 27, status: "다른용무중" },
];
  
  export default function StatusTraker (){
    const statusText = ['온라인', '오프라인'];
    const statusArr = []
    for(let i = 0; i < 30; i++){
        statusArr.push({id: i, status: "Unknown"})
    }
    for(let num=1;num<=10;num++){
        statusArr.push({id:statusArr[-1]?.id+num, status:statusText[Math.floor(Math.random() * 2)]})
    }

    const uptimeCaculDown = data.filter((item) => item.status === "오프라인").length * 10;
    console.log("다운타임: ",uptimeCaculDown);
    const uptimeCaculUp = data.filter((item) => item.status !== "오프라인").length * 10;
    console.log("업타임: ",uptimeCaculUp);
    // const uptime = Math.ceil((Math.round((data.length*10 / (uptimeCaculUp + uptimeCaculDown)) * 100))*10)/10;
    console.log(((statusArr.length*10 - uptimeCaculDown) /statusArr.length*10 ))
    const uptime = (data.filter((item) => item.status !== "Unknown").length*10 - uptimeCaculDown) /data.filter((item) => item.status !== "Unknown").length*10
    return (
        <Card maxWidth="w-full">
            <Title>Status monitoring</Title>
            <Text>Harin</Text>
            <Flex justifyContent="justify-end" marginTop="mt-4">
                <Text>Uptime {String(uptime).slice(0,4)}%</Text>
            </Flex>
            <Tracking marginTop="mt-2">
                {data.map((item) => (
                    <TrackingBlock
                        color={statusStyles[item.status]}
                        tooltip={item.status}
                        key={item.id}
                    />
                ))}
            </Tracking>
        </Card>
    )
  };
  