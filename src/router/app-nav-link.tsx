import React, { cloneElement, isValidElement } from 'react';
import { useRoute } from './route';
import { getGotoHref } from '@saasfe/we-app/lib/routing/locate';
import { getRouteSwitchConfig, Route } from '@saasfe/we-app/lib/routing/route';
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

  return <a className={className} {...config} href={gotoHref}>{component}</a>;
}

export interface NavLinkProps {
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
              basename={routerConfig.appBasename}
            />
          );
        }
      }
    </WeAppConsumer>
  );
}
