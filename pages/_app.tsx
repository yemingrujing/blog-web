import App from 'next/app';
import 'antd/dist/antd.css';
import 'highlight.js/styles/atelier-dune-dark.css';
import versionInfo from '../package.json';

class MyApp extends App {
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
}

export default MyApp;
