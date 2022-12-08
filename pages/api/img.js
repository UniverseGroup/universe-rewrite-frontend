// Image Proxy Route

export default async (req, res) => {
    const { url } = req.query;
    const response = await fetch(url,{responseType: 'arraybuffer'});
    //const buffer = await response.buffer();
    const buffer = Buffer.from(await response.arrayBuffer(),'utf-8')
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(buffer);
}
// export default async (req, res) => {
//     const url = decodeURIComponent(req.query.url);
//     const result = await fetch(url);
//     const body = await result.body
//     body.pipe(res);
// };
