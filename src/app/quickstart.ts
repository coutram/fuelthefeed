import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

async function main() {
  const height = await aptos.getLedgerInfo();
  console.log("Current ledger height is", height.ledger_version);
}

main();