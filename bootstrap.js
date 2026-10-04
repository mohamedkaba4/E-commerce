const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { spawn } = require("node:child_process");

async function main() {
  const secretId = process.env.APP_SECRET_ID;

  if (!secretId) {
    throw new Error("APP_SECRET_ID is not set");
  }

  const client = new SecretsManagerClient({
    region: process.env.AWS_REGION || "us-east-1",
  });

  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: secretId,
    })
  );

  const secrets = JSON.parse(response.SecretString);

  for (const [key, value] of Object.entries(secrets)) {
    process.env[key] = value;
  }

  console.log("Secrets loaded from AWS Secrets Manager");

  const child = spawn(
    "node",
    ["apps/storefront/server.js"],
    {
      stdio: "inherit",
      env: process.env,
    }
  );

  child.on("exit", (code) => {
    process.exit(code ?? 1);
  });
}

main().catch((err) => {
  console.error("Failed to load application secrets:", err);
  process.exit(1);
});
