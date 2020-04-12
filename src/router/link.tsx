import React from 'react';
import { getGotoHref, GetGotoHrefParams } from '@saasfe/we-app/es/routing/locate';
import { getRouteSwitchConfig, Route } from '@saasfe/we-app/es/routing/route';
import { WeAppConsumer } from '../contex';

interface LinkElementProps extends GetGotoHrefParams {
  children: any;
}

function LinkElement({ to, basename, routerType, children, ...rest }: LinkElementProps) {
  const gotoHref = getGotoHref({
    to,
    basename,
    routerType,
  });
  const config = getRouteSwitchConfig(gotoHref, routerType);

  return <a {...rest} {...config} href={gotoHref}>{children}</a>;
}

export interface LinkProps {
  to: Route;
  children: any;
}

export default function Link(props: LinkProps) {
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
