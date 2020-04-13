import { useContext, useCallback } from 'react';
import { getGotoHref } from '@saasfe/we-app/es/routing/locate';
import { Route } from '@saasfe/we-app/es/routing/route';
import { WeAppContext } from '../context';

export function navigate(to: string) {
  if (window.history.pushState) {
    window.history.pushState(null, null, to);
  } else if (to?.indexOf('#') > -1) {
    window.location.hash = to;
  } else {
    window.location.href = to;
  }
}

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
