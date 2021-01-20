import HttpClients from '../utils/HttpClients';
import getUrl, { MethodEnum } from '../config';

class Abstract {
    protected baseUrl = typeof self === 'object' ? '/web/' : 'http://127.0.0.1:7001/web/';

    private fetch(method, url, param: any) {
      const _url = (url as string).split('.');
      const reqUrl = getUrl(_url[0], _url[1]);
      return HttpClients.request(method, this.baseUrl + reqUrl, param || {});
    }

    /**
     * GET类型的网络请求
     */
    protected getReq(url, param: any) {
      return this.fetch(MethodEnum.GET, url, param);
    }

    /**
     * POST类型的网络请求
     */
    protected postReq(url, param: any) {
      return this.fetch(MethodEnum.POST, url, param);
    }

    /**
     * PUT类型的网络请求
     */
    protected putReq(url, param: any) {
      return this.fetch(MethodEnum.PUT, url, param);
    }

    /**
     * DELETE类型的网络请求
     */
    protected deleteReq(url, param: any) {
      return this.fetch(MethodEnum.DELETE, url, param);
    }
}

export default Abstract;
