---
order: 1
title: demo1
---

PC模板

````jsx
import { WeAppProvider, Link, AppLink, AppNavLink, RouterType } from "@saasfe/we-app-react";

function Demo() {
  return (
    <WeAppProvider route={['/a', '/b/:id', '/link', '/app-link']} routerType={RouterType.hash}>
      <div><Link to="/link">Hello Link</Link></div>
      <div><AppLink to="/app-link">Hello AppLink</AppLink></div>
      <div><AppNavLink to="/app-nav-link">Hello AppNavLink</AppNavLink></div>
    </WeAppProvider>
  );
}

ReactDOM.render(<Demo />, mountNode);
````
