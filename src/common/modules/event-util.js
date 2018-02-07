//跨浏览器事件处理
let EventUtil = {
    addHandler: (element, type, handler) => {
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            element.attachEvent('on' + type, handler);
        }else{
            element['on' + type] = handler;
        }
    }
}