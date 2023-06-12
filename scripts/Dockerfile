FROM nginx:latest

# 替换自定义nginx配置文件

RUN rm /etc/nginx/nginx.conf
COPY ./scripts/nginx.conf /etc/nginx

WORKDIR /usr/share/nginx/html

COPY ./build .

EXPOSE 80