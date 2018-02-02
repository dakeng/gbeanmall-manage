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
        if(_method === "POST"){
            const init = {
                method: _method,
                body: this.config.body,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('请求超时');
                }, this.config.timeout);
                fetch(this.config.url, init).then(resolve, reject);
            });
        }
    }
}