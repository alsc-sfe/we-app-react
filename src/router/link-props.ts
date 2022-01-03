/**
 * @file link-props.ts
 * 这里强制刷新相应的应用，需要等待 we-app-container 提供的 waitWeappUnloadApp 异步方法执行完毕
 */
import { getGotoHref } from '@saasfe/we-app-utils';
import { appNavigate } from './redirect';

/**
 * 获取 link 的跳转属性
 * @param config {
    to,
    basename,
    appBasename,
    routerType,
  }
 * @returns {
   href,
   onClick?,
 }
 */
export default function linkProps(config) {
  const gotoHref = getGotoHref(config);

  if (config.to?.refresh == null || !(window as any).waitWeappUnloadApp) {
    return {
      href: gotoHref,
    };
  }

  return {
    href: gotoHref,
    onClick: async (e) => {
      e.preventDefault();

      // 调用等待 we-app 卸载应用
      await (window as any).waitWeappUnloadApp(gotoHref);

      // 调用跳转方法
      appNavigate(config);
    },
  };
}
