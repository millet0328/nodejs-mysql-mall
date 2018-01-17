/*
 * 获取服务器数据service
 */
// 获取商品列表
function getGoodsList(data) {
    return axios.get("/goods", {
        params: data
    });
}

// 根据id获取商品详情
function getGoodsDetail(data) {
    return axios.get("/goods/detail", {
        params: data
    });
}