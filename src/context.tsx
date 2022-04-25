import React, { createContext, cloneElement, isValidElement, useContext, ReactNode } from 'react';
import { RenderCustomProps, AppLocationInstance, RouterType } from '@saasfe/we-app-types';
import { useRoute, UseRouteParams } from './router/route';

// 缓存全局配置，如appBasename、routerType等
export const SITE_CONFIG = {
  appBasename: '',
  routerType: RouterType.browser,
};

export interface WeAppContextProps extends RenderCustomProps {
  match?: AppLocationInstance;
  [prop: string]: any;
}

export interface WeAppProviderProps extends WeAppContextProps, UseRouteParams {
  // 产品路由前缀，如/crm
  appBasename?: string;
  // 产品路由拼接当前子应用路由前缀，如/crm/data
  basename: string;
  routerType: RouterType;
  children: ReactNode;
  matchProps?: object;
  // 与productName 配套使用，用于开启多渠道投放时的开关，开启后会合并 productName 到路径上
  useProduct?: boolean;
  // 产品名，用于多渠道投放
  productName?: string;
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
