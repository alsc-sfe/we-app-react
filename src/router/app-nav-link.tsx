import React, { cloneElement, isValidElement } from 'react';
import { useRoute } from './route';
import { getGotoHref } from '@saasfe/we-app/es/routing/locate';
import { getRouteSwitchConfig, Route } from '@saasfe/we-app/es/routing/route';
import { WeAppConsumer, WeAppProviderProps } from '../contex';

function NavLinkElement(props: WeAppProviderProps) {
  const { to, route, exact, strict,
    routeMatch, onRouteMatch, matchProps,
    children, locate, routerType, basename, ...rest } = props;

  const gotoHref = getGotoHref({
    to,
    routerType,
    basename,
  });
  const config = getRouteSwitchConfig(gotoHref, routerType);

  const [match, matchLocate] = useRoute(props);

  const comProps = match ? {
    ...rest,
    ...matchProps,
    match: matchLocate,
  } : rest;
  const component = isValidElement(children) ? cloneElement(children, comProps) : children;

  return <a {...rest} {...config} href={gotoHref}>{component}</a>;
}

export interface NavLinkProps {
  to: Route;
  route?: Route;
  children: any;
}

export default function NavLink(props: NavLinkProps) {
  return (
    <WeAppConsumer>
      {
        (routerConfig) => {
          return <NavLinkElement {...props} {...routerConfig} basename={routerConfig.appBasename} />;
        }
      }
    </WeAppConsumer>
  );
}
