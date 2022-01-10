---
order: 1
title: 微应用路由
---

微应用路由

````jsx
import { WeAppProvider, 
  Link, useNavigate, appNavigate,
  AppLink, AppNavLink, navigate,
  useLocation, useParams, useQuery,
  RouterType } from "@saasfe/we-app-react";

function HelloAppNavLink({ style }) {
  return (
    <div style={style}>Hello AppNavLink</div>
  );
}

function Demo() {
  const navigateHook = useNavigate();
  const appNavigateHook = useNavigate(true);

  const loc = useLocation();
  const params = useParams();
  const query = useQuery();

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

      <div>Location</div>
      <div>loc: {JSON.stringify(loc, null, '  ')}</div>
      <div>params: {JSON.stringify(params, null, '  ')}</div>
      <div>query: {JSON.stringify(query, null, '  ')}</div>
    </>
  );
}

ReactDOM.render((
  <WeAppProvider route
    routerType={RouterType.hash}
    basename="/crm/weapp"
    appBasename="/crm">
    <Demo />
  </WeAppProvider>
), mountNode);
````
