# 在终端一条一条跑
cd equipment-front/nginx/keys
openssl genrsa -des3 -out nginx.key 2048                # 生成一个RSA密钥
openssl req -new -key nginx.key -out nginx.csr          # 生成一个证书请求
openssl rsa -in nginx.key -out nginx_nopass.key         # 创建不需要输入密码的RSA证书
openssl x509 -req -days 3650 -in nginx.csr  -signkey nginx.key -out nginx.crt   # 签发证书
cd ../../..
