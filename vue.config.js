module.exports = {
    devServer:{
        proxy:{
            '/ajax':{
                target:"https://m.maoyan.com",
                changeOrigin:true
            },
            '/cgi-bin':{
                target:"https://u.y.qq.com",
                changeOrigin:true
            }
        }
    }
}