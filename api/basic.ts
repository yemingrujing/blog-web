import Abstract from './index';
import { ArticleDemo } from '../config';

class Basic extends Abstract {
  getInfo(url:string) {
    return this.getReq(url, null);
  }

  getArticl(params: ArticleDemo) {
    return this.postReq('Basic.article', params);
  }
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Basic();
  return instance;
})();
