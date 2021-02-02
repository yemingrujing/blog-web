import App, { AppInitialProps, AppContext } from 'next/app';
import 'antd/dist/antd.css';
import 'highlight.js/styles/atelier-dune-dark.css';
import { Provider } from 'react-redux';
import { ColorModeProvider } from '@chakra-ui/core';
import ErrorPage from '@/components/error-page';
import withReduxStore from '../redux/with-redux-store';
import versionInfo from '../package.json';

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = async ({
    Component,
    ctx,
  }: AppContext) => ({
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      // Some custom thing for all pages
      pathname: ctx.pathname,
    },
  });

  componentDidMount() {
    const { reduxStore } = this.props as any;
    const info = [
      `Version: ${versionInfo.version}`,
      `Author: ${`${versionInfo.author.name} - ${versionInfo.author.email}`}`,
      `Homepage: ${versionInfo.homepage}`,
      `Description: ${versionInfo.description}`,
      `Check out our code here: ${reduxStore.getState().app.config.projectGithub}`,
      'Have a great day! 📣🐢',
    ];
    for (const message of info) {
      console.log(message);
    }
  }

  public render() {
    const {
      Component,
      pageProps,
      reduxStore,
    } = this.props as any;
    return (
      <Provider store={reduxStore}>
        <ColorModeProvider>
          {reduxStore.getState().app.error ? (
            <ErrorPage statusCode={reduxStore.getState().app.error.status} />
          ) : (
            <Component {...pageProps} />
          )}
        </ColorModeProvider>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
