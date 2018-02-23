# Api 文档

服务端的本地地址：http://localhost:4000 <br>
所有请求的数据及返回的数据都用json传送 <br>
返回的数据格式一般为
```
{
    status: 1,  //1 正常，0 非正常
    data: {}    //返回的数据内容
}
```

## 获取商品列表
```
GET /commodity
```

## 新增商品
```
POST /commodity
```
```
{
    operate: 1,
    data: {
        commodity_name: '商品名称',
        commodity_price: '商品价格',
        commodity_specification: '商品规格'
    }
}
```
## 删除商品
```
POST /commodity
```
```
{
    operate: 2,
    _id: '' //商品id
}
```
## 查找商品(待办)
```
{
    operate: 3,
    data: {
        findByName: 'name',
        findByPrice: '>12'  //'<' or '>' or '=' + number
    }
}
```
## 修改商品信息
```
{
    operate: 4,
    _id: '12313546',    //商品id
    data: {
        //要修改的内容
        //commodity_name
        //commodity_price
        //commodity_specification
    }
}
```
## 获取任务列表
```
GET /task
```
## 创建新任务
```
POST /task
{
    task_id: String,//任务id
    task_name: String,//任务名称
    task_reward: Number,//任务奖励
    task_des: String,//任务描述
}
```