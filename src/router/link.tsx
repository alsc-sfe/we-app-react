import React from 'react';
import { getGotoHref, GetGotoHrefParams } from '@saasfe/we-app/es/routing/locate';
import { getRouteSwitchConfig, Route } from '@saasfe/we-app/es/routing/route';
import { WeAppConsumer } from '../context';

interface LinkElementProps extends GetGotoHrefParams {
  children: any;
  className?: string;
}

function LinkElement({ to, basename, routerType, children, className }: LinkElementProps) {
  const gotoHref = getGotoHref({
    to,
    basename,
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
          return <LinkElement {...props} {...routerConfig} basename={routerConfig.appBasename} />;
        }
      }
    </WeAppConsumer>
  );
}
