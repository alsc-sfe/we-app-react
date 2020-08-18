import { useState, useEffect, useCallback, useMemo } from 'react';
import { parseLocate, DEFAULTRouteMatch, isFunction } from '@saasfe/we-app-utils';
import { Locate, AppLocationInstance, RouteMatch,
  Route as TRoute, RouteMatchParams, RouterType } from '@saasfe/we-app-types';

export interface UseRouteParams extends RouteMatchParams {
  to?: TRoute;
  route?: TRoute;
  routeIgnore?: TRoute;
  routeMatch?: RouteMatch;
  onRouteMatch?: (params: Locate) => void;
}

// 优先按照route进行匹配，如果没有指定route，则使用to
export function useRoute({
  to, route, routeIgnore, exact, strict,
  routeMatch = DEFAULTRouteMatch,
  onRouteMatch,
  locate = window.location,
  basename = '',
  appBasename = '',
  routerType = RouterType.browser,
}: UseRouteParams): [boolean, AppLocationInstance] {
  const [currentRoute, changeCurrentRoute] = useState(window.location.href);
  // 将当前访问的路径和当前指定的路径进行匹配，判断是否匹配
  const routeRule = route || to;

  const match = useMemo(() => routeMatch({
    exact,
    strict,
    route: routeRule,
    routeIgnore,
    locate,
    basename,
    appBasename,
    routerType,
  }), [currentRoute]); // eslint-disable-line

  const matchLocate = parseLocate({
    route: routeRule,
    locate,
    basename,
    appBasename,
    routerType,
  });

  useEffect(() => {
    if (match && isFunction(onRouteMatch)) {
      onRouteMatch(matchLocate);
    }
  }, [currentRoute]); // eslint-disable-line

  const trackRouteChange = useCallback(() => {
    changeCurrentRoute(window.location.href);
  }, [changeCurrentRoute]);

  useEffect(() => {
    window.addEventListener('single-spa:routing-event', trackRouteChange);
    return () => {
      window.removeEventListener('single-spa:routing-event', trackRouteChange);
    };
  }, [trackRouteChange]);

  return [match, matchLocate];
}
