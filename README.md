# django-webpack

- python3 的 django 模板 与 前端 webpack(4/5)打包的解决方案

## 环境

- 后端

  - 安装依赖

    - pip3 install -r requirements.txt

  - 启动服务

    - cd django-webpack/portal/ && pathon3 manage.py runserver

- 前端

  - 安装依赖

    - cd django-webpack/portal/frontend && yarn

    - 启动环境（watch, dev-server(模板文件的修改需要手动刷新)）

    - yarn watch

## 后端 setting

- 静态文件

```
STATICFILES_DIRS = [
  os.path.join(BASE_DIR, "dist"),
]

STATIC_URL = '/static/'
```

- 静态文件路由

```

STATIC_URL = '/static/'
```

- 模板文件

```
'BACKEND': 'django.template.backends.django.DjangoTemplates',
'DIRS': [os.path.join(BASE_DIR, 'dist/templates')],
```

## 未完成但计划要完成的（优先级排序）

* js及模板的mock配置

* js及模板的环境变量

* css等其他文件的loader

* eslint

* js及模板的lang(支持不同语言)

* 打包上传oss

* 单元测试