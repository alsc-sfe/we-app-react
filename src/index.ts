import { RouterType } from '@saasfe/we-app/lib/routing/enum';
import AppNavLink from './router/app-nav-link';
import { WeAppProvider, WeAppConsumer, WeAppContext } from './context';
import { Link, AppLink } from './router/link';
import { Redirect, AppRedirect, useNavigate, navigate, appNavigate } from './router/redirect';

export default {
  Link,
  AppLink,
  AppNavLink,
  Redirect,
  AppRedirect,
  useNavigate,
  navigate,
  appNavigate,

  WeAppContext,
  WeAppProvider,
  WeAppConsumer,

  RouterType,
};

export {
  Link,
  AppLink,
  AppNavLink,
  Redirect,
  AppRedirect,
  useNavigate,
  navigate,
  appNavigate,

  WeAppContext,
  WeAppProvider,
  WeAppConsumer,

  RouterType,
};
