// @ts-ignore
import * as WebView from 'webview';

const child = WebView.spawn({
  // options for webview
  title: 'My App',
  width: 1024,
  height: 768,
  dir: './',

  // options for child_process.spawn
  cwd: process.cwd(),
});
