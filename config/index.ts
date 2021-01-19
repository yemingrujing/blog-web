export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

interface UrlDict {
    [key: string]: {
        [key: string]: string;
    };
}

const urlDict: UrlDict = {
  Basic: {
    article: 'list',
    info: 'info',
    detail: 'detail',
    keywordsSearch: 'keywordsSearch',
    comments: 'comments',
    comment: 'comment',
    timeLine: 'timeLine',
    gallery: 'gallery',
    statistics: 'statistics',
  },
};

const getUrl = (biz: string, UrlName: string): string => {
  try {
    const bizKeys = Object.keys(urlDict);
    if (bizKeys.indexOf(biz) < 0) {
      throw new Error('biz not in Dict');
    }
    let hostname = urlDict[biz][UrlName];
    if (!hostname) {
      throw new Error('url not in Dict');
    }
    if (hostname.substr(0, 1) === '/') {
      hostname = hostname.substr(1);
    }
    return hostname;
  } catch (err) {
    console.error(err);
    return '';
  }
};

export default getUrl;

export interface AxiosRequest {
  baseURL?: string;
  url: string;
  data?: any;
  params?: any;
  method?: Method;
  headers?: any;
  timeout?: number;
  responseType?: ResponseType;
}

export interface AxiosResponse {
  data: any;
  status: boolean;
  message: string;
}

export interface ArticleDemo {
  page: number;
}
