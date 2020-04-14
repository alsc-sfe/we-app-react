---
order: 1
title: 微应用路由
---

微应用路由

````jsx
import { WeAppProvider, 
  Link, useNavigate, appNavigate,
  AppLink, AppNavLink,
  RouterType } from "@alife/we-app-react";

function Demo() {
  const navigateHook = useNavigate();
  const appNavigateHook = useNavigate(true);

  return (
    <>
      <div><button onClick={navigateHook.bind(this, '/navigate-hook')}>navigate hook</button></div>
      <div><button onClick={appNavigateHook.bind(this, '/app-navigate-hook')}>app navigate hook</button></div>
      <div><button onClick={appNavigate.bind(this, { to: '/app-navigate' })}>app navigate</button></div>
      <div><Link to="/link">Hello Link</Link></div>
      <div><AppLink to="/app-link">Hello AppLink</AppLink></div>
      <div><AppNavLink to="/app-nav-link">Hello AppNavLink</AppNavLink></div>
    </>
  );
}

ReactDOM.render((
  <WeAppProvider route={[
    '/navigate', '/link', 
    '~/crm/app-navigate', '~/crm/app-link', '~/crm/app-nav-link']} 
    routerType={RouterType.hash}
    basename="/crm/weapp"
    appBasename="/crm">
    <Demo />
  </WeAppProvider>
), mountNode);
````
