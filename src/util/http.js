import axios from "axios"

const http = axios.create({
    baseURL:'https://m.maizuo.com',
    timeout:10000,
    headers:{
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1612578131297645528580097"}',
    },
})

export default http