openssl genrsa -out keys/rsa_private_key.pem 2048
openssl rsa -in keys/rsa_private_key.pem -pubout -out keys/rsa_public_key.pem
