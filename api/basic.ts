import Abstract from './index';
import { ArticleDemo } from '../config';

class Basic extends Abstract {
  getDemo(params: ArticleDemo) {
    return this.getReq('Basic.GetDemo', params);
  }
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Basic();
  return instance;
})();
