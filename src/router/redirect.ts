import { useContext, useCallback } from 'react';
import { Route, RouteObj } from '@saasfe/we-app-types';
import { getGotoHref, navigate } from '@saasfe/we-app-utils';
import { WeAppContext, SITE_CONFIG } from '../context';

export function useNavigate(isApp: boolean = false) {
  const context = useContext(WeAppContext);

  const navigateTo = useCallback((to: Route) => {
    if (!context) {
      console.error('请在WeAppProvider中使用');
      return;
    }

    const gotoHref = getGotoHref({
      ...context,
      basename: isApp ? context.appBasename : context.basename,
      appBasename: context.appBasename,
      to,
    });
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

export function appNavigate(props: AppNavigateProps) {
  const gotoHref = getGotoHref({
    to: typeof props === 'string' ? props : props.to || props,
    // 当前方法强制命中站点根路径，所以重写basename为appBasename
    basename: SITE_CONFIG.appBasename,
    appBasename: SITE_CONFIG.appBasename,
    routerType: SITE_CONFIG.routerType,
  });

  navigate(gotoHref);
}
