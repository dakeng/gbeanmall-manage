export default class FetchUtil {
    constructor(config){
        this.config = {
            body: {},
            url: '',
            method: 'POST',
            timeout: 60000
        };
        Object.assign(this.config, config);
        return this.exec();
    }

    exec(){
        const _method = this.config.method.toUpperCase();
        let init = {
            method: _method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        if(_method === "POST"){
            Object.assign(init, {body: this.config.body});
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('请求超时');
                }, this.config.timeout);
                fetch(this.config.url, init).then(resolve, reject);
            });
        }
        if(_method === "GET"){
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('请求超时');
                }, this.config.timeout);
                fetch(this.config.url, init).then(resolve, reject);
            });
        }
    }
}