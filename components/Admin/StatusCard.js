import { Card, Metric, Text } from "@tremor/react";

const TypeText = (type) => {
    switch (type.type) {
        case 'Bot':
            return <Text>Bot</Text>
        case 'User':
            return <Text>Server</Text>
        default:
            return <Text>Bot</Text>
    }
}

export default ({type,value}) => {
    return(
       <Card maxWidth="max-w-xs" decoration="top" decorationColor="indigo">
            <TypeText type={type}/>
            <Metric>{value}</Metric>
        </Card> 
    )
  
};
