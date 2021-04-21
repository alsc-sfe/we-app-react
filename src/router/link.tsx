import React from 'react';
import { getGotoHref, getRouteSwitchConfig } from '@saasfe/we-app-utils';
import { GetGotoHrefParams, Route } from '@saasfe/we-app-types';
import { WeAppConsumer } from '../context';

interface LinkElementProps extends GetGotoHrefParams {
  children: any;
  className?: string;
  extProps?: any;
}

function LinkElement({
  to,
  basename,
  appBasename,
  routerType,
  children,
  className,
  extProps,
}: LinkElementProps) {
  const gotoHref = getGotoHref({
    to,
    basename,
    appBasename,
    routerType,
  });
  const config = getRouteSwitchConfig(gotoHref, routerType);
  // @ts-ignore
  return (
    <a className={className} {...config} href={gotoHref} {...extProps}>
      {children}
    </a>
  );
}

export interface LinkProps {
  to: Route;
  children: any;
  className?: string;
}

export function Link(props: LinkProps) {
  return (
    <WeAppConsumer>
      {(routerConfig) => {
        return <LinkElement {...props} {...routerConfig} />;
      }}
    </WeAppConsumer>
  );
}

export function AppLink(props: LinkProps) {
  return (
    <WeAppConsumer>
      {(routerConfig) => {
        return <LinkElement {...routerConfig} {...props} basename={routerConfig.appBasename} />;
      }}
    </WeAppConsumer>
  );
}
