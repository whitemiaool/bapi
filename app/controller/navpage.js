const axios = require('axios');

exports.getWeather = async function(ctx,next){
    let res = await axios.get('https://api.seniverse.com/v3/weather/now.json?key=xvnubptgf2noegwr&location=chengdu&language=zh-Hans&unit=c');
    let postres = await axios.get('https://api.seniverse.com/v3/weather/daily.json?key=xvnubptgf2noegwr&location=chengdu&language=zh-Hans&unit=c&start=-1&days=5');
    ctx.response.body = {
        code:11,
        msg:'success',
        data:{res:res.data,postres:postres.data}
    }
}