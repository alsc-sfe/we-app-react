import React, { cloneElement, isValidElement } from 'react';
import { useRoute } from './route';
import { getRouteSwitchConfig } from '@saasfe/we-app-utils';
import { Route } from '@saasfe/we-app-types';
import { WeAppConsumer, WeAppProviderProps } from '../context';
import linkProps from './link-props';

interface NavLinkElementProps extends WeAppProviderProps {
  className?: string;
  extProps?: any;
}

function NavLinkElement(props: NavLinkElementProps) {
  const {
    to,
    route,
    exact,
    strict,
    routeMatch,
    onRouteMatch,
    matchProps,
    children,
    locate,
    routerType,
    basename,
    appBasename,
    className,
    extProps,
    ...rest
  } = props;

  const getLinkProps = linkProps({
    to,
    basename,
    appBasename,
    routerType,
  });

  const gotoHref = getLinkProps.href;

  const config = getRouteSwitchConfig(gotoHref, routerType);

  const [match, matchLocate] = useRoute(props);

  const comProps = match
    ? {
        ...rest,
        ...matchProps,
        match: matchLocate,
      }
    : rest;
  const component = isValidElement(children) ? cloneElement(children, comProps) : children;
  // @ts-ignore
  return (
    <a className={className} {...config} {...getLinkProps} {...extProps}>
      {component}
    </a>
  );
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
      {(routerConfig) => {
        return (
          <NavLinkElement
            {...routerConfig}
            {...props}
            route={props.route || props.to}
            routeIgnore={props.routeIgnore}
            basename={routerConfig.appBasename}
          />
        );
      }}
    </WeAppConsumer>
  );
}
