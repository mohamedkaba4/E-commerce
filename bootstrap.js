const {
  SSMClient,
  GetParametersCommand,
} = require("@aws-sdk/client-ssm");

const { spawn } = require("node:child_process");

async function main() {
  const prefix = process.env.SSM_PARAMETER_PREFIX || "/nextjs/prod";

  const parameterNames = [
    `${prefix}/DATABASE_URL`,
    `${prefix}/NEXTAUTH_SECRET`,
    `${prefix}/GOOGLE_CLIENT_ID`,
    `${prefix}/GOOGLE_CLIENT_SECRET`,
    `${prefix}/GITHUB_ID`,
    `${prefix}/GITHUB_SECRET`,
  ];

  const client = new SSMClient({
    region: process.env.AWS_REGION || "us-east-1",
  });

  const response = await client.send(
    new GetParametersCommand({
      Names: parameterNames,
      WithDecryption: true,
    })
  );

  if (response.InvalidParameters?.length) {
    throw new Error(
      `Missing SSM parameters: ${response.InvalidParameters.join(", ")}`
    );
  }

  for (const parameter of response.Parameters ?? []) {
    const envName = parameter.Name.split("/").pop();

    if (!envName || !parameter.Value) {
      continue;
    }

    process.env[envName] = parameter.Value;
  }

  console.log("Loaded application configuration from SSM Parameter Store");

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

main().catch((error) => {
  console.error("Failed to load SSM parameters:", error);
  process.exit(1);
});
