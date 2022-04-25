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
  const getLinkProps = linkProps({
    to,
    basename,
    appBasename,
    routerType,
  });

  console.log('tttttt getLinkProps111: ', getLinkProps);

  const gotoHref = getLinkProps.href;
  const config = getRouteSwitchConfig(gotoHref, routerType);
  console.log('tttttt getLinkProps222: ', gotoHref, config, extProps);

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

/**
 * 子应用内跳转
 * @param props
 * @returns
 */
export function Link(props: LinkProps) {
  return (
    <WeAppConsumer>
      {(routerConfig) => {
        return <LinkElement {...props} {...routerConfig} />;
      }}
    </WeAppConsumer>
  );
}

/**
 * 子应用与子应用之间跳转
 * @param props
 * @returns
 */
export function AppLink(props: LinkProps) {
  return (
    <WeAppConsumer>
      {(routerConfig) => {
        const basename = routerConfig.useProduct ? `${routerConfig.appBasename}/${routerConfig.productName}` : routerConfig.appBasename;
        return <LinkElement {...routerConfig} {...props} basename={basename} />;
      }}
    </WeAppConsumer>
  );
}
