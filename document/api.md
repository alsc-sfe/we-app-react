---
title: 微应用 React 绑定
subtitle: We App React
cols: 2
---

## API

### Context

配合微应用框架传入的props，向子组件传递

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| WeAppContext        | Context | React.Context   |  |
| WeAppProvider        | 基于Context.Provider，添加路由匹配检测 | React.Element   |  |
| WeAppConsumer        | 基于Context.Consumer，添加Provider环境检测 | React.Element   |  |

### 路由相关组件及API

路由由basename和path两部分构成，由于在微应用体系内还会存在全站级别的appBasename，其中basename包含appBasename，所以路由分为3类：

假设appBasename为/crm，子应用为weapp，则页面接收到的basename为/crm/weapp，appBasename为/crm。

路由类型 | 示例
----|-----|------|------
| 子应用内路由    | 子应用weapp，内部页面home，path写为/home，最终路由为/crm/weapp/home |
| 子应用**间**路由 | 子应用weapp，跳转到子应用otherweapp，path写为/list的页面，最终路由为/crm/otherweapp/list |
| 绝对路由     | 跳转到/xxx，最终路由为/xxx |

#### Link/AppLink

1. 子应用内跳转使用 Link
2. 子应用间跳转使用 AppLink

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| to        | 链接，**必须以/开头**，建议使用微应用内路径，如/detail或者{path: '/detail', query: 'id=1&new=1'}或者{path: '/detail', query: {id:1,new:1}} | String/Object   | 无 |
| children        | 子节点 | React.children   | 无 |
| className        | 样式 | String   | 无 |

#### AppNavLink

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| to        | 链接，建议使用微应用内路径，如/detail或者{path: '/detail', query: 'id=1&new=1'}或者{path: '/detail', query: {id: 1, new: 1} | String/Object   | 无 |
| exact       | 是否完全匹配 | Boolean   | false |
| strict       | 是否末尾无/ | Boolean   | false |
| route | 路由匹配规则，基于path-to-regexp | String/String[] | 无
| routeMatch       | 路径匹配函数，用于确定当前路径是否匹配 | Function   | 内置匹配函数 |
| onRouteMatch       | 路径匹配时的回调，入参为当前匹配的路径对象，含pathname、params、query等 | Function   | 无 |
| matchProps       | 路径匹配时向children注入的props，默认会传入match，一般传className即可 | Object   | { match: true/false } |
| children        | 子组件 | React.Element，props中注入match，即当前匹配的路径对象，含pathname、params、query等   | 无 |
| className        | 样式 | String   | 无 |

#### Redirect/AppRedirect

1. 子应用内跳转使用 Redirect
2. 子应用间跳转使用 AppRedirect

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| to        | 链接，建议使用微应用内路径，如/detail或者{path: '/detail', query: 'id=1&new=1'}或者{path: '/detail', query: {id: 1, new: 1} | String/Object   | 无 |

#### useNavigate

React hook，返回跳转函数。

hook 接收参数如下：

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| isApp     | 是否应用间跳转 | Boolean   | false |

跳转函数接收参数如下：

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| to        | 链接，建议使用微应用内路径，如/detail或者{path: '/detail', query: 'id=1&new=1'}或者{path: '/detail', query: {id: 1, new: 1} | String/Object   | 无 |

#### navigate

绝对路由跳转。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| to        | 跳转链接 | String   | 无 |
