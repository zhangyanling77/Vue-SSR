# Vue-SSR
vue服务端渲染实践


```
 npm run client:build
 npm run server:build
 nodemon server.js
```

目录结构
```
-- vue-ssr
 -- build
  -- webpack.base.js
  -- weboack.client.js
  -- webpack.server.js
 -- dist
  -- client.bundle.js
  -- index.html
  -- index.ssr.html
  -- server.bundle.js
  -- vue-ssr-client-manifest.json
  -- vue-ssr-server-bundle.json
  -- 1.bundle.js
 -- src
  -- components
   -- Bar.vue
   -- Foo.vue
  -- App.vue
  -- client-entry.js
  -- main.js
  -- router.js
  -- server-entry.js
  -- store.js
 -- package.json
 -- server.js
 -- yarn.lock
 ```
