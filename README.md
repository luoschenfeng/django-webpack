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

## 未完成但计划要完成的（优先级排序）

- js 及模板的 mock 配置

- js 及模板的环境变量

- css 等其他文件的 loader

- eslint

- js 及模板的 lang(支持不同语言)

- 打包上传 oss

- 单元测试
