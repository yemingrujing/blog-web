import Abstract from './index';
import { ArticleDemo, BlogSearchDemo } from '../config';

class Basic extends Abstract {
  getInfo(url:string) {
    return this.getReq(url, null);
  }

  getArticl(params: ArticleDemo) {
    return this.postReq('Basic.Article', params);
  }

  blogSearch(params: BlogSearchDemo) {
    return this.postReq('Basic.BlogSearch', params);
  }

  detail(params: BlogSearchDemo) {
    return this.postReq('Basic.Detail', params);
  }

  comment(params: BlogSearchDemo) {
    return this.postReq('Basic.Comment', params);
  }

  timeLine(params: BlogSearchDemo) {
    return this.postReq('Basic.TimeLine', params);
  }

  gallery(params: BlogSearchDemo) {
    return this.postReq('Basic.Gallery', params);
  }
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Basic();
  return instance;
})();
