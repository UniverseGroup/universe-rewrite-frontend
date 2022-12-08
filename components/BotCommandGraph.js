import { Card, Title, BarChart, Subtitle } from "@tremor/react";

const chartdata = [
  {
    name: "내정보",
    "명령어 실행 횟수": 2488,
  },
  {
    name: "서버정보",
    "명령어 실행 횟수": 1445,
  },
  {
    name: "ping",
    "명령어 실행 횟수": 743,
  },
];

const dataFormatter = (number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

export default function BotCommandGraph (){
  return(<Card>
    <Title>Harin's Command Run Count</Title>
    <Subtitle>
      Harin봇의 명령어 실행횟수 그래프입니다. 이것을 통해 인기있는 커맨드를 확인해보세요!
    </Subtitle>
    <BarChart
      data={chartdata}
      dataKey="name"
      categories={["명령어 실행 횟수"]}
      colors={["blue"]}
      valueFormatter={dataFormatter}
      marginTop="mt-6"
      yAxisWidth="w-12"
    />
  </Card>)
};
