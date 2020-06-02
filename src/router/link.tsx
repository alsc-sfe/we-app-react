import React from 'react';
import { getGotoHref, GetGotoHrefParams, getRouteSwitchConfig, Route } from '@saasfe/we-app';
import { WeAppConsumer } from '../context';

interface LinkElementProps extends GetGotoHrefParams {
  children: any;
  className?: string;
}

function LinkElement({ to, basename, appBasename, routerType, children, className }: LinkElementProps) {
  const gotoHref = getGotoHref({
    to,
    basename,
    appBasename,
    routerType,
  });
  const config = getRouteSwitchConfig(gotoHref, routerType);

  return <a className={className} {...config} href={gotoHref}>{children}</a>;
}

export interface LinkProps {
  to: Route;
  children: any;
  className?: string;
}

export function Link(props: LinkProps) {
  return (
    <WeAppConsumer>
      {
        (routerConfig) => {
          return <LinkElement {...props} {...routerConfig} />;
        }
      }
    </WeAppConsumer>
  );
}

export function AppLink(props: LinkProps) {
  return (
    <WeAppConsumer>
      {
        (routerConfig) => {
          return <LinkElement {...routerConfig} {...props} basename={routerConfig.appBasename} />;
        }
      }
    </WeAppConsumer>
  );
}
