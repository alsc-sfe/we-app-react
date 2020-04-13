import React from 'react';
import { Route } from '@saasfe/we-app/es/routing/route';
import { WeAppConsumer } from '../contex';
import { LinkElement } from './link';

export interface AppLinkProps {
  to: Route;
  children: any;
}

export default function AppLink(props: AppLinkProps) {
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
