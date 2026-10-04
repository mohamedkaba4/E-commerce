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

echo "=== Configuring nginx ==="
sudo systemctl enable nginx

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

# DATABASE_URL is only needed during the build if Prisma/build steps require it.
# Do NOT persist this value into PM2 or the AMI runtime configuration.
DB_URL=$(aws ssm get-parameter \
  --name "/nextjs/prod/DATABASE_URL" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region us-east-1)

export DATABASE_URL="$DB_URL"

echo "Available npm scripts:"
npm run

echo "Installing dependencies..."
npm ci --include=optional

echo "Generating Prisma client..."
npm run db:generate

echo "Building storefront..."
npm run build:store

echo "Building admin..."
npm run build:admin

# Ensure no PM2 runtime state is baked into the AMI.
pm2 delete all 2>/dev/null || true
rm -f "$HOME/.pm2/dump.pm2"

echo "Application build completed."
EOF

echo "=== AMI build complete ==="