import Snowfall from 'react-snowfall'
const SnowFall = () => {
    const snowflake1 = document.createElement('img')
    snowflake1.src = '/snow.png'
    const snowflake2 = document.createElement('img')
    snowflake2.src = '/snow2.png'
    const snows = [snowflake1, snowflake2]
    return (
        <Snowfall snowflakeCount={50} images={snows} radius={[16, 18]}/>
    )
}
export default SnowFall;