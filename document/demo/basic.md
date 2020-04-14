---
order: 1
title: 微应用路由
---

微应用路由

````jsx
import { WeAppProvider, 
  Link, useNavigate, appNavigate,
  AppLink, AppNavLink, navigate,
  RouterType } from "@alife/we-app-react";

function HelloAppNavLink({ style }) {
  return (
    <div style={style}>Hello AppNavLink</div>
  );
}

function Demo() {
  const navigateHook = useNavigate();
  const appNavigateHook = useNavigate(true);

  return (
    <>
      <div><button onClick={navigateHook.bind(this, '/navigate-hook')}>weapp navigate by hook</button></div>
      <div><button onClick={appNavigateHook.bind(this, '/app-navigate-hook')}>app navigate by hook</button></div>
      <div><button onClick={appNavigate.bind(this, '/app-navigate')}>app navigate by appNavigate</button></div>
      <div><button onClick={navigate.bind(this, '#/full')}>自定义路径跳转，需包含routerType</button></div>
      <div><Link to="/link">Hello weapp Link</Link></div>
      <div><Link to="~/link">Hello ~Link 等效于 AppLink /link</Link></div>
      <div><AppLink to="/app-link">Hello AppLink</AppLink></div>
      <div><AppNavLink to="/app-nav-link" matchProps={{ style: { background: 'red' } }}><HelloAppNavLink /></AppNavLink></div>
    </>
  );
}

ReactDOM.render((
  <WeAppProvider route={[
    '/navigate-hook', '~/app-navigate-hook', '~/app-navigate',
    '/link', '~/link',
    '~/app-link', '~/app-nav-link']} 
    routerType={RouterType.hash}
    basename="/crm/weapp"
    appBasename="/crm">
    <Demo />
  </WeAppProvider>
), mountNode);
````
