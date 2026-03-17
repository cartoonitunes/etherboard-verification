const solc = require("solc");
const fs = require("fs");
const https = require("https");

const ADDRESS = "0x350e0ffc780a6a75b44cc52e1ff9092870668945";
const COMPILER = "v0.1.7+commit.b4e666cc";

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => resolve(JSON.parse(d)));
    }).on("error", reject);
  });
}

async function main() {
  console.log("Fetching on-chain bytecode...");
  const codeRes = await fetch(
    `https://api.etherscan.io/api?module=proxy&action=eth_getCode&address=${ADDRESS}&tag=latest`
  );
  const targetRuntime = codeRes.result.substring(2);

  const createRes = await fetch(
    `https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses=${ADDRESS}`
  );
  const targetInit = createRes.result[0].creationBytecode.substring(2);

  console.log(`Loading compiler ${COMPILER}...`);
  const snap = await new Promise((r, j) =>
    solc.loadRemoteVersion(COMPILER, (e, s) => (e ? j(e) : r(s)))
  );

  const src = fs.readFileSync(__dirname + "/Etherboard.sol", "utf8");
  const result = JSON.parse(snap.lowlevel.compileSingle(src, 1));
  const compiled = result.contracts["Etherboard"];

  const initMatch = compiled.bytecode === targetInit;
  const runtimeMatch = compiled.runtimeBytecode === targetRuntime;

  console.log(`\nInit bytecode:    ${initMatch ? "EXACT MATCH" : "MISMATCH"} (${targetInit.length / 2} bytes)`);
  console.log(`Runtime bytecode: ${runtimeMatch ? "EXACT MATCH" : "MISMATCH"} (${targetRuntime.length / 2} bytes)`);

  process.exit(initMatch && runtimeMatch ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
