import React, { cloneElement, isValidElement } from 'react';
import { useRoute } from './route';
import { getGotoHref, getRouteSwitchConfig } from '@saasfe/we-app-utils';
import { Route } from '@saasfe/we-app-types';
import { WeAppConsumer, WeAppProviderProps } from '../context';

interface NavLinkElementProps extends WeAppProviderProps {
  className?: string;
}

function NavLinkElement(props: NavLinkElementProps) {
  const { to, route, exact, strict,
    routeMatch, onRouteMatch, matchProps,
    children, locate, routerType, basename, appBasename,
    className, ...rest } = props;

  const gotoHref = getGotoHref({
    to,
    routerType,
    basename,
    appBasename,
  });
  const config = getRouteSwitchConfig(gotoHref, routerType);

  const [match, matchLocate] = useRoute(props);

  const comProps = match ? {
    ...rest,
    ...matchProps,
    match: matchLocate,
  } : rest;
  const component = isValidElement(children) ? cloneElement(children, comProps) : children;
  // @ts-ignore
  return <a className={className} {...config} href={gotoHref}>{component}</a>;
}

export interface NavLinkProps extends NavLinkElementProps {
  to: Route;
  route?: Route;
  children: any;
  className?: string;
}

export default function AppNavLink(props: NavLinkProps) {
  return (
    <WeAppConsumer>
      {
        (routerConfig) => {
          return (
            <NavLinkElement
              {...routerConfig}
              {...props}
              route={props.route || props.to}
              routeIgnore={props.routeIgnore}
              basename={routerConfig.appBasename}
            />
          );
        }
      }
    </WeAppConsumer>
  );
}
