import { Card, Title, LineChart } from "@tremor/react";

// const chartdata = [
//   {
//     date: "10/21",
//     "서버수": 10,
//   },
//   {
//     date: "10/22",
//     "서버수": 13,
//   },
//   {
//     date: "10/23",
//     "서버수": 18,
//   },
//   {
//     date: "10/24",
//     "서버수": 23,
//   },
//   {
//     date: "10/25",
//     "서버수": 30,
//   },
//   {
//     date: "10/26",
//     "서버수": 42,
//   },
//   {
//     date: "10/27",
//     "서버수": 37,
//   },
// ];

export default function BotGrowthGraph(){
    const chartdata = []
    for(let i=0;i<=7;i++){
        chartdata.push({date:`10/${11+i}`, "서버수":Math.floor(Math.random() * 100)})
    }
    return (
       <Card>
            <Title>Server Growth Graph</Title>
            <LineChart
            data={chartdata}
            dataKey="date"
            categories={["서버수"]}
            colors={["blue"]}
            marginTop="mt-6"         
            yAxisWidth="w-10"
            />
        </Card> 
    )
  
};
