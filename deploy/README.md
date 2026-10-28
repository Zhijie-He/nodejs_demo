# 服务器前端更新

网站运行在自己的服务器：`http://162.62.225.150:8080`，GitHub仅保存代码。
服务器仓库：`/home/ubuntu/code/nodejs_demo`。

## 日常流程

本地修改、预览后，提交并推送到GitHub `main`。服务器每两分钟检查一次，只接受前端和deploy目录的快进更新；Express直接读取前端文件，无需重启后端。浏览器刷新后看到新版本。

后端、数据库、根目录配置变更不会自动部署。服务器前端存在未提交修改，或Git历史分叉时，也会停止更新。

## 运维

手动更新：`~/.local/bin/china-tech-trip-update`
查看日志：`tail -n 50 ~/.local/state/china-tech-trip/update.log`
暂停自动更新：`crontab -e`，删除带`# china-tech-trip-auto-update`的行。

每次更新前保留前端备份、旧版本号和服务器本地配置差异：
`~/.local/state/china-tech-trip/backups/`。

常规回滚：在本地对有问题的前端提交执行`git revert`并推送；服务器会同步回滚提交。若GitHub暂时不可用，先暂停自动更新，再从所选备份恢复frontend；本地改动会阻止后续自动覆盖。

自动更新是拉取方式，不开放Webhook或额外端口，也不需要把服务器密码放到GitHub。更新日志保留在服务器，目前不发送失败通知。
