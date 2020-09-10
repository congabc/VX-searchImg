export default (params)=>{
    // 加载
    uni.showLoading({
        title:"加载中"
    })
    return new Promise((resolve, reject)=>{
        // 后台接口
        uni.request({
            ...params,
            //成功回调
            success(res){
                resolve(res)
            },
            // 失败回调
            fail(err){
                reject(err)
            },
            // 关闭加载
            complete(){
                uni.hideLoading();
            }
        })
    })
}