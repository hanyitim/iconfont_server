#Dockerfile
# 使用node作为镜像
FROM node
#在容器中创建目录
RUN mkdir -p /home/project
#设置容器的工作目录为该目录
WORKDIR /home/project
#向外提供3000端口
EXPOSE 3000
#容器创建完成后只需的命令
CMD npm install --registry=https://registry.npm.taobao.org && pm2 ./bin/www
