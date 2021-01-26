import Abstract from './index';
import { ArticleDemo, BlogSearchDemo } from '../config';

class Basic extends Abstract {
  getInfo = (url: string) => this.getReq(url, null);

  getArticl = (params: ArticleDemo) => this.postReq('Basic.Article', params);

  blogSearch = (params: BlogSearchDemo) => this.postReq('Basic.BlogSearch', params);

  detail = (params: BlogSearchDemo) => this.postReq('Basic.Detail', params);

  comment = (params: BlogSearchDemo) => this.postReq('Basic.Comment', params);

  timeLine = () => this.getReq('Basic.TimeLine', null);

  gallery = () => this.getReq('Basic.Gallery', null);
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Basic();
  return instance;
})();
