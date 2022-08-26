// 1. 引入
import axios from "axios";

// 2. 创建实例
const instance = axios.create({
    // 3. 配置
    // 每次请求的协议、IP地址,设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
    baseURL: "/api",
    // 请求超时时间
    timeout: 10000,
    // 每次请求携带cookie
    withCredentials: true
});

// instance.interceptors.response.use(
//     // 对于成功响应的处理
//     res => {
//         // Not login
//         if (res.data.code === 'notlogin') {
//             router.replace({
//                 path: '/login'
//             })
//         }
//         return res;
//     },
//     // 处理错误响应
//     err => Promise.reject()
// );

// 4. 导出
export default instance