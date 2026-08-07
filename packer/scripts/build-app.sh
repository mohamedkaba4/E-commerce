#!/bin/bash
set -euo pipefail

APP_DIR="/home/ec2-user/E-commerce"
SOURCE_DIR="/tmp/mavencrest-src"

echo "=== Installing packages ==="
sudo dnf install -y git nginx

echo "=== Installing application files ==="
sudo mkdir -p "$APP_DIR"
sudo cp -R "$SOURCE_DIR"/. "$APP_DIR"/
sudo chown -R ec2-user:ec2-user "$APP_DIR"

echo "=== Starting nginx ==="
sudo systemctl enable nginx
sudo systemctl start nginx

echo "=== Building application as ec2-user ==="

sudo -iu ec2-user bash <<'EOF'
set -euo pipefail

APP_DIR="/home/ec2-user/E-commerce"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

cd "$APP_DIR"

echo "Current directory:"
pwd

echo "Files:"
ls -la

echo "package.json exists?"
ls -l package.json

DB_URL=$(aws ssm get-parameter \
  --name "/nextjs/prod/DATABASE_URL" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region us-east-1)

export DATABASE_URL="$DB_URL"

echo "Scripts:"
npm run
npm ci --include=optional
npm run db:generate
npm run build:store
npm run build:admin

pm2 delete all || true

pm2 start npm \
  --name "mavencrest-storefront" \
  --cwd "$APP_DIR" \
  -- run start:store

pm2 start npm \
  --name "mavencrest-admin" \
  --cwd "$APP_DIR" \
  -- run start:admin

pm2 save
EOF

echo "=== AMI build complete ==="