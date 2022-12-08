import {
    TabList,
    Tab,
    Card,
    ProgressBar,
    Flex,
    Text,
    Metric,
    ColGrid,
  } from "@tremor/react";
  import Divider from "./Divider";
  import { useState } from "react";
  import StatusCard from "./Admin/StatusCard";
  import PandingBotCard from "./Admin/PandingBotCard";
  const LocationB = [
    {
        name: "Harin#9147",
        id: "893841721958469703",
        prefix: "!",
        library: "discord.js",
        category: ["Music", "Moderation", "Utility"],
        submitusername: "Harin#0001"
    },
    {
        name: "Example#0000",
        id: "893841721958469704",
        prefix: "~",
        library: "discord.py",
        category: ["Music"],
        submitusername: "gawi#9537"
    },
    {
        name: "Example#0000",
        id: "893841721958469705",
        prefix: "~",
        library: "discord.py",
        category: ["Music"],
        submitusername: "gawi#9537"
    },
  ];
  const LocationTitle = (showCard)=>{
    switch(showCard.showCard){
        case 1:
            return <Metric>Main</Metric>
        case 2:
            return <Metric>Panding Bot</Metric>
        default:
            return <Metric>Main</Metric>
    }
  }
  export default () => {
    const [showCard, setShowCard] = useState(1);
    return (
      <Card>
        <>
          <Text>UNIVERSE Admin Panel</Text>
          <LocationTitle showCard={showCard}/>
          <TabList
            defaultValue={1}
            handleSelect={(value) => setShowCard(value)}
            marginTop="mt-6"
          >
            <Tab value={1} text="Main" />
            <Tab value={2} text="Panding" />
          </TabList>
        </>
  
        {showCard === 1 && (
          <div className="mt-6">
            <ColGrid numColsMd={ 2 } numColsLg={ 3 } gapY={"gap-y-2.5"} marginTop="mt-6">
                <StatusCard type={"Bot"} value={100}/>
                <StatusCard type={"User"} value={100}/>
                <StatusCard type={"User"} value={100}/>
            </ColGrid>
          </div>
        )}
        {showCard===2&&(
          <div className="mt-6">
            <div className="px-2 py-1 rounded-lg shadow-md w-32 my-3" style={{"borderLeftWidth":"4px","borderColor":"rgb(74 222 128)"}}>
                <p className="text-md text-gray-600">대기중인 봇 갯수</p>
                <p className="font-bold text-xl">{LocationB.length}개</p>
            </div>
            <Divider className={"bg-gray-200 "}/>
            <ColGrid numColsMd={ 2 } numColsLg={ 3 } gapY={"gap-y-2.5"} gapX={'gap-x-3'} marginTop="mt-6">
                {LocationB.map((item,index) => (
                    <PandingBotCard key={index} value={item} index={index}/>
                ))}
            </ColGrid>
          </div>
        )}
      </Card>
    );
  };
  