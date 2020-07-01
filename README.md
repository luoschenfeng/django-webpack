# django-webpack

- python3 的 django 模板 与 前端 webpack(4/5)打包的解决方案

## 环境

- 后端

  - 进入虚拟环境（退出 deactivate）

    - source virtual-env/bin/activate

  - 安装依赖

    - pip3 install -r requirements.txt

  - 启动服务

    - cd django-webpack/project/ && pathon3 manage.py runserver

- 前端

  - 安装依赖

    - cd django-webpack/projetc/frontend && yarn

  - 启动环境(watch, dev-server)

    - yarn watch

    - yarn server (模板文件的修改需要手动刷新)

## 后端 setting.py 配置

- 静态文件查询目录

```
STATICFILES_DIRS = [
  os.path.join(BASE_DIR, "frontend/dist"),
]
```

- 静态文件路由

```

STATIC_URL = '/static/'
```

- 模板文件查询目录

```
'BACKEND': 'django.template.backends.django.DjangoTemplates',
'DIRS': [os.path.join(BASE_DIR, 'frontend/dist/templates')],
```

## 说明

- 环境变量

  1. 模板和 js 公用一套环境变量，

  2. 依据 BUILD_ENV 来判断是否为沙箱环境，来启用.env.sandBox

  3. .env(所有模式共同拥有) 、.local.env(本地不被 git 跟踪) 、 .env.{mode}(指定模式下的独有的变量), 同一变量后者会覆盖掉前者, 尽量不要覆盖掉已经指定的环境变量(eg: NODE_ENV)

  4. js 中使用(process.env.AUTHOR) ,模板中使用({{ AUTHOR }}, 甚至{{ NODE_ENV }})

## 代码分层

├── README.md
├── project
│   ├── frontend // 前端项目
│   │   ├── config // 配置
│   │   │   ├── alias.js // 别名配置
│   │   │   ├── env.js // 环境配置变量
│   │   │   ├── lang.js // lang配置
│   │   │   ├── mock.js // mock配置
│   │   │   ├── oss.js  // oss配置
│   │   │   ├── units.js  // 其他工具
│   │   │   └── webpack  // webpack 配置文件夹
│   │   │   │   ├── multi-entry-template.js // 生成多入口多模板
│   │   │   │   ├── plugins  // 用到的插件
│   │   │   │   │   ├── inject-env-data.js  // 插入环境变量到模板
│   │   │   │   │   ├── inject-js-plugin.js  // 插入chunks到指定域中
│   │   │   │   │   └── inline-script-html-plugin.js  // 用标签在html中插入脚本内容，指定chunk名称
│   │   │   │   └── rules.js  // module.ules
│   │   ├── dist  // 打包后的文件，供后端使用
│   │   │   ├── assets  // 静态资源
│   │   │   │   └── images
│   │   │   │   └── style
│   │   │   ├── js  // js 资源
│   │   │   │   ├── modules  // 拆分的依赖包
│   │   │   │   └── pages  // 各页面的js
│   │   │   ├── templates // 打包后的后端模板
│   │   ├── env  // 环境变量
│   │   ├── mock  // mock文件夹
│   │   │   ├── ajax
│   │   │   └── template
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── api
│   │   │   ├── assets
│   │   │   │   └── images
│   │   │   ├── lang
│   │   │   │   └── zh
│   │   │   │   ├── js
│   │   │   │   └── template
│   │   │   ├── pages 
│   │   │   ├── style
│   │   │   ├── templates
│   │   │   ├── utils
│   │   │   │   └── index.js
│   │   ├── tests
│   │   ├── webpack.common.js
│   │   ├── webpack.dev.js
│   │   ├── webpack.prod.js
│   │   ├── webpack.watch.js
│   │   ├── yarn-error.log
│   │   └── yarn.lock
│   ├── manage.py
│   ├── project
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── views.py
│   └── record
├── requirements.txt
├── virtual-env

## 未完成但计划要完成的（优先级排序）

- js 及模板的 mock 配置

- css 等其他文件的 loader

- build 优化

- eslint

- js 及模板的 lang(支持不同语言)

- 打包上传 oss

- 单元测试
