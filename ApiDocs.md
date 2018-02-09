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
    data: {
        id: '12'    //商品id
    }
}
```
## 查找商品
```
{
    operate: 3,
    data: {
        findByName: 'name',
        findByPrice: '>12'  //'<' or '>' or '=' + number
    }
}
```