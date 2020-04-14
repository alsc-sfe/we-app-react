import React, { createContext, cloneElement, isValidElement, useContext } from 'react';
import { RenderCustomProps } from '@saasfe/we-app/lib/weapp/base';
import { AppLocation } from '@saasfe/we-app/lib/routing/locate';
import { useRoute, UseRouteParams } from './router/route';
import { RouterType } from '.';

// 缓存全局配置，如appBasename、routerType等
export const SITE_CONFIG = {
  appBasename: '',
  routerType: RouterType.browser,
};

export interface WeAppContextProps extends RenderCustomProps {
  match?: AppLocation;
  [prop: string]: any;
}

export interface WeAppProviderProps extends WeAppContextProps, UseRouteParams {
  children: any;
  matchProps?: object;
}

const WeAppContext = createContext<WeAppContextProps>(null);

const { Provider } = WeAppContext;

export {
  WeAppContext,
};

export function WeAppProvider(props: WeAppProviderProps) {
  const { children, matchProps, ...rest } = props;

  SITE_CONFIG.appBasename = rest.appBasename;
  SITE_CONFIG.routerType = rest.routerType;

  // 匹配路由
  const [, matchLocate] = useRoute(rest);

  const context = {
    ...rest,
    ...matchProps,
    match: matchLocate,
  };

  let element: any = children;
  if (isValidElement(children)) {
    element = cloneElement(children, context);
    if (Array.isArray(children)) {
      element = children.map((child, i) => {
        return cloneElement(child, {
          ...context,
          key: `we-app-provider-${i}`,
        });
      });
    }
  }

  return (
    <Provider value={context}>
      {element}
    </Provider>
  );
}

export interface WeAppConsumerProps {
  children: (context: WeAppContextProps) => any;
  [prop: string]: any;
}

export function WeAppConsumer(props: WeAppConsumerProps) {
  const { children } = props;
  const context = useContext(WeAppContext);

  if (!context) {
    console.error('请在WeAppProvider中使用');
    return null;
  }
  return children(context);
}
