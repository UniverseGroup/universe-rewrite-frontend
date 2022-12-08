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
  ];
  
  export default function PingTraker (){
    return (
        <Card maxWidth="w-full">
            <Title>Ping monitoring</Title>
            <Text>Harin</Text>
            <Flex justifyContent="justify-end" marginTop="mt-4">
                <Text>Average Ping 34ms</Text>
            </Flex>
            <Tracking marginTop="mt-2">
                {data.map((item) => (
                    <TrackingBlock
                        color={statusStyles[item.status]}
                        tooltip={item.status}
                    />
                ))}
            </Tracking>
        </Card>
    )
  };
  