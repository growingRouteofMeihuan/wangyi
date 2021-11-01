let express = require("express")
let app = express()
// 跨域请求设置
app.all("*", function (req, res, next) {
    // 任何网址都可以访问
    res.header('Access-Control-Allow-Origin', "*");
    // 允许的请求方式
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET, DELETE,OPTIONS');
    // 是普通请求还是阿贾克斯请求
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header("X-Powered-By", "3.2.1")
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 伪数据
let clothes =
    [{
        name: '女装GUCCI', price: 22, category: 'goodsList_clothes', img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548499978550&di=1f1fd228cf709228fca93dcafabbf02e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F24%2F20151024113616_BvLPT.jpeg'
    }, {
        name: '女装MK', price: 33, category: 'goodsList_clothes', img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=648227110,1457501216&fm=26&gp=0.jpg'
    }, {
        name: '女装巴宝莉', price: 44, category: 'goodsList_clothes', img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=6777935,920341325&fm=26&gp=0.jpg'
    }, {
        name: '香奈儿', price: 55, category: 'goodsList_clothes', img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548499789767&di=b4f2a12515147480cf44c7a2f7c68e78&imgtype=0&src=http%3A%2F%2Fimg.book118.com%2Fsr1%2FM00%2F28%2F31%2FwKh2AlveM9iIKYlgAB0cz4zZFTwAAP7GwG_jcwAHRzn525.jpg'
    }];
//模拟在中间件操作MySQL
app.get("/search", (req, res) => {
    var key = req.query.searchKey
    //console.log(key)
    let _filterGoods = clothes.filter(item => {
        //-1表示没有找到
        return item.name.indexOf(key) !== -1
    })
    //如果没有找到，返回的是一个空集,要对这种情况做处理
    let resultObj = _filterGoods.length > 0 ? _filterGoods[0] : { msg: "没有找到结果" }
    res.send(resultObj)
})
// 导航栏
app.get("/get_tabBtn_list", (req, res) => {
    //伪数据
    let titles = ["推荐", "生活", "服饰", "美食", "个护", "母婴", "学习", "旅游"]
    res.send(titles)
    //console.log("done")
})
// 轮播图
app.get("/get_swipeImg_list", (req, res) => {
    let imgList = ["https://yanxuan.nosdn.127.net/0fae504f6958db87ee919c38bac02c9b.png?type=webp&imageView&quality=95&thumbnail=1920x420",
        "https://yanxuan.nosdn.127.net/0fae504f6958db87ee919c38bac02c9b.png?type=webp&imageView&quality=95&thumbnail=1920x420"]
    res.send(imgList)
})

// 商品分类页商品
app.get("/goodsList_0", (req, res) => {
    let goodsList_0 = [
        {
            img_url:
                "https://yanxuan-item.nosdn.127.net/e78096b543cc65af16da3a93cacb4071.png?quality=75&type=webp&imageView&thumbnail=216x216",
            name: "自行车",
            price: "￥219"
        },
        {
            img_url:
                "https://yanxuan-item.nosdn.127.net/570e762763536175b9ec226c0d93a7cd.png?quality=75&type=webp&imageView&thumbnail=216x216",
            name: "裤子",
            price: "￥167",
        },
    ]
    res.send(goodsList_0)
})

app.get("/goodsList_1", (req, res) => {
    let goodsList_1 = [
        {
            img_url:
                "https://yanxuan-item.nosdn.127.net/f3f18a4fe9e7905cd7c9ff28e42ff0c2.png?quality=75&type=webp&imageView&thumbnail=216x216",
            name: "伞",
            price: "￥50.2",
        },
        {
            img_url:
                "https://yanxuan-item.nosdn.127.net/0b05c22b99e8fc2cf3015e4bbb8d7c3f.png?quality=75&type=webp&imageView&thumbnail=216x216",
            name: "发热片",
            img_txt: "￥139",
        },
    ]
    res.send(goodsList_1)
})

app.get("/goodsList_2", (req, res) => {
    let goodsList_2 = [
        {
            img_url:
                "https://yanxuan-item.nosdn.127.net/ec55e5314bfd670320c3c15ce5e0b095.png?quality=75&type=webp&imageView&thumbnail=216x216",
            name: "零食",
            price: "￥42.8",
        },
        {
            img_url:
                "https://yanxuan-item.nosdn.127.net/f815bf4d31ece0500089d69475c2014c.png?quality=75&type=webp&imageView&thumbnail=216x216",
            name: "项链",
            price: "￥249",
        },
    ]
    res.send(goodsList_2)
})
app.listen(3344, () => {
    console.log("端口3344，已经启动")
})


