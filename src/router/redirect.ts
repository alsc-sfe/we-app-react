import { useContext, useCallback } from 'react';
import { Route, RouteObj } from '@saasfe/we-app-types';
import { getGotoHref, navigate } from '@saasfe/we-app-utils';
import { WeAppContext, SITE_CONFIG } from '../context';

/**
 * hooks 获取跳转函数
 * @param isApp 是否子应用间跳转
 */
export function useNavigate(isApp: boolean = false) {
  const context = useContext(WeAppContext);

  const navigateTo = useCallback(async (to: Route) => {
    if (!context) {
      console.error('请在WeAppProvider中使用');
      return;
    }

    const basename = context.useProduct ? `${context.appBasename}/${context.productName}` : context.appBasename;

    const gotoHref = getGotoHref({
      ...context,
      basename: isApp ? basename : context.basename,
      appBasename: context.appBasename,
      to,
    });

    if ((to as any).refresh === true && (window as any).waitWeappUnloadApp) {
      await (window as any).waitWeappUnloadApp(gotoHref);
    }

    navigate(gotoHref);
  }, [context, isApp]);

  return navigateTo;
}

export interface RedirectProps {
  to: Route;
}

export function Redirect(props: RedirectProps) {
  const navigateTo = useNavigate();
  navigateTo(props.to);
  return null;
}

export function AppRedirect(props: RedirectProps) {
  const navigateTo = useNavigate(true);
  navigateTo(props.to);
  return null;
}

export type AppNavigateProps = string | RouteObj | { to: string | RouteObj };

// 注意：在多子产品的场景会出现错误，请使用useNavigate
export async function appNavigate(props: AppNavigateProps) {
  const to = typeof props === 'string' ? props : props.to || props;
  const gotoHref = getGotoHref({
    to,
    // 当前方法强制命中站点根路径，所以重写basename为appBasename
    basename: SITE_CONFIG.appBasename,
    appBasename: SITE_CONFIG.appBasename,
    routerType: SITE_CONFIG.routerType,
  });

  if ((props as any).refresh === true && (window as any).waitWeappUnloadApp) {
    await (window as any).waitWeappUnloadApp(gotoHref);
  }

  navigate(gotoHref);
}
