const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const envPath = path.join(projectRoot, ".env");
const outputPath = path.join(projectRoot, "public", "firebase-config.js");

function parseEnv(fileContent) {
  const env = {};
  const lines = fileContent.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    env[key] = value;
  }

  return env;
}

if (!fs.existsSync(envPath)) {
  console.error("Missing .env file. Create it from .env.example first.");
  process.exit(1);
}

const env = parseEnv(fs.readFileSync(envPath, "utf8"));

const required = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
  "FIREBASE_MEASUREMENT_ID",
];

const missing = required.filter((key) => !env[key]);
if (missing.length > 0) {
  console.error(`Missing required env keys: ${missing.join(", ")}`);
  process.exit(1);
}

const moduleContent = `export const firebaseConfig = {
  apiKey: ${JSON.stringify(env.FIREBASE_API_KEY)},
  authDomain: ${JSON.stringify(env.FIREBASE_AUTH_DOMAIN)},
  projectId: ${JSON.stringify(env.FIREBASE_PROJECT_ID)},
  storageBucket: ${JSON.stringify(env.FIREBASE_STORAGE_BUCKET)},
  messagingSenderId: ${JSON.stringify(env.FIREBASE_MESSAGING_SENDER_ID)},
  appId: ${JSON.stringify(env.FIREBASE_APP_ID)},
  measurementId: ${JSON.stringify(env.FIREBASE_MEASUREMENT_ID)},
};
`;

fs.writeFileSync(outputPath, moduleContent, "utf8");
console.log(`Created ${path.relative(projectRoot, outputPath)} from .env`);
