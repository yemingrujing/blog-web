import HttpClients from '../utils/HttpClients';
import getUrl, { Method } from '../config';

class Abstract {
    protected baseUrl = typeof self === 'object' ? '/web/' : 'http://127.0.0.1:7001/web/';

    private fetch(method: Method, url, param: any) {
      const _url = (url as string).split('.');
      const reqUrl = getUrl(_url[0], _url[1]);
      return HttpClients.request(param ? 'POST' : 'GET', this.baseUrl + reqUrl, param || {});
    }

    /**
     * GET类型的网络请求
     */
    protected getReq(url, param: any) {
      return this.fetch('GET', url, param);
    }

    /**
     * POST类型的网络请求
     */
    protected postReq(url, param: any) {
      return this.fetch('POST', url, param);
    }

    /**
     * PUT类型的网络请求
     */
    protected putReq(url, param: any) {
      return this.fetch('PUT', url, param);
    }

    /**
     * DELETE类型的网络请求
     */
    protected deleteReq(url, param: any) {
      return this.fetch('DELETE', url, param);
    }
}

export default Abstract;
