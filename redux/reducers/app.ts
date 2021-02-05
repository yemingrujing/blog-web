import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  config: {
    siteTitle: string;
    siteIcp: string;
    siteDomain: string;
    icpGovCn: string;
    siteLogo: string;
    email: string;
    github: string;
    projectGithub: string;
  };
  error: {
    status: number;
  };
}

const initialState: State = {
  config: {
    siteTitle: '',
    siteIcp: '皖ICP备2021001637号',
    siteDomain: '',
    icpGovCn: 'http://beian.miit.gov.cn/',
    siteLogo: '',
    email: 'yemingrujing@gmail.com',
    github: 'https://github.com/yemingrujing',
    projectGithub: 'https://github.com/yemingrujing/blog-web',
  },
  error: null,
};

interface ConfigDataLoaded {
  config: State['config'];
}

interface StatusCodeDataLoaded {
  error: {
    status: number;
  };
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<ConfigDataLoaded>) {
      const { config } = action.payload;
      state.config = { ...state.config, ...config };
    },
    setError(state, action: PayloadAction<StatusCodeDataLoaded>) {
      const { error } = action.payload;
      state.error = { ...state.error, ...error };
    },
  },
});

export const {
  setError,
  setConfig,
} = app.actions;

export default app.reducer;
