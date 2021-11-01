/*
    rem，适配文件，这是我是老尚的
*/
;
(function (win) {
    var doc = win.document;
    // 获取根元素html
    var docEl = doc.documentElement;
    // 获取meta，自适应标签
    var metaEl = doc.querySelector('meta[name="viewport"]');
    // 获取设备像素比
    var devicePixelRatio = win.devicePixelRatio;
    var tid;
    // 设置标签属性，viewport-fit=cover针对刘海屏的，
    // user - scalable=no用户不可以缩放，minimum - scale=.5，真实的缩放比例scale=1/dpr
    metaEl.setAttribute(
        "content",
        "initial-scale=.5, maximum-scale=.5, minimum-scale=.5, user-scalable=no viewport-fit=cover")

    function refreshRem() {
        // 获取当前窗口宽度
        var width = docEl.getBoundingClientRect().width;
        // navigator.userAgent获取浏览器信息，里面包含你使用的设备的信息
        /* Mozilla/5.0(iPhone; CPU iPhone OS 13_2_3 like Mac OS X)
         AppleWebKit / 605.1.15(KHTML, like Gecko) Version / 13.0.3 Mobile
             / 15E148 Safari / 604.1 */
        //toLowerCase，大写转成小写
        var ua = navigator.userAgent.toLowerCase();
        // 在ua里，找不到ipad的时候，执行，普通手机时，执行 
        // /ipad/正则表达式
        if (!/ipad/.test(ua)) {
            // 375 / 2，不大于750，所以不执行if里，不知道面对的是什么设备
            //可能是电脑
            if (width / 2 > 750) {
                width = device - width
            }
            // rem是CSS3新增的一个相对单位（root em，根em）
            var rem = width / 10;//在width=375时，rem=37.5，为什么选10，好算
            //适配的重点是dpr，其它
            docEl.style.fontSize = rem + "px";//设置根标签html字体大小的默认值为37.5px
        }
    }
    refreshRem();
    // 监听win的resize事件
    win.addEventListener("resize",
        function () {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300)
        },
        false);
    /* 当一条会话历史记录被执行的时候将会触发页面显示
        (pageshow)事件。(这包括了后退 / 前进按钮操作，
    同时也会在onload 事件触发后初始化页面时触发)，
    属性persisted 是个	boolean	值，表示网页是否是来自缓存. */
    win.addEventListener("pageshow",
        function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300)
            }
        },
        false);

})(window)