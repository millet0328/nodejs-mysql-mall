/*
 * 获取服务器数据service
 */
function getGoodsList(data) {
    return axios.get("/goods", {
        params: data
    })
}