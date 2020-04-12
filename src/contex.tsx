import React, { createContext, cloneElement } from 'react';
import { RenderCustomProps } from '@saasfe/we-app/es/weapp/base';
import { AppLocation } from '@saasfe/we-app/es/routing/locate';
import { useRoute, UseRouteParams } from './router/route';

export interface WeAppContextProps extends RenderCustomProps {
  match?: AppLocation;
  [prop: string]: any;
}

export interface WeAppProviderProps extends WeAppContextProps, UseRouteParams {
  children: any;
  matchProps?: object;
}

const WeAppContext = createContext<WeAppContextProps>(null);

const { Provider, Consumer } = WeAppContext;

export function WeAppProvider(props: WeAppProviderProps) {
  const { children, matchProps, ...rest } = props;

  // 匹配路由
  const [matched, matchLocate] = useRoute(rest);
  if (!matched) {
    return null;
  }

  const context = {
    ...rest,
    ...matchProps,
    match: matchLocate,
  };
  const element = cloneElement(children, context);

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
  return (
    <Consumer>
      {(context) => {
        if (!context) {
          console.warn('请在WeAppProvider中使用');
          return null;
        }

        return children(context);
      }}
    </Consumer>
  );
}
