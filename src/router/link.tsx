import React from 'react';
import { getRouteSwitchConfig } from '@saasfe/we-app-utils';
import { GetGotoHrefParams, Route } from '@saasfe/we-app-types';
import { WeAppConsumer } from '../context';
import linkProps from './link-props';

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
  alert(`ttttttt000: ${JSON.stringify({
    to,
    basename,
    appBasename,
    routerType,
  }, null, '  ')}`);
  const getLinkProps = linkProps({
    to,
    basename,
    appBasename,
    routerType,
  });

  const gotoHref = getLinkProps.href;
  const config = getRouteSwitchConfig(gotoHref, routerType);

  // @ts-ignore
  return (
    <a className={className} {...config} {...getLinkProps} {...extProps}>
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
