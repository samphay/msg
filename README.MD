#msg.js

## Intro

msg是一款无需加载任何js库的独立js插件。仿照IOS的alert样式，高效，轻量，并具有丰富的扩展性。

## How to use

引用 `<script src="./js/msg.min.js"></script>` 便可方便使用 `msg` 对象:
> `msg.alert`

```javascript
    msg.alert("alert内容",function(){
        //alert 回调
    });
```

> `msg.tips`

```javascript
    msg.tips("tips");
```

> `msg.confirm`

```javascript
    var opt = {
                context : "",           //提示文字
                btnCount : 2,           //按钮数：1时，只显示确定按钮
                confirm : null,         //确定回调函数
                cancel : null,          //取消回调函数
                confirmText : "确定",   //确定按钮文案
                cancelText : "取消"     //取消按钮文案
            };
    msg.confirm(opt);
```
