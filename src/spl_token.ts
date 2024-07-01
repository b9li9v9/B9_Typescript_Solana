import * as web3 from "@solana/web3.js";
import * as helpers from "@solana-developers/helpers";
import * as token from "@solana/spl-token";
import * as path from "path";

async function main(): Promise<void> {
  // local load keypair
  const local_account: web3.Keypair = await helpers.getKeypairFromFile(
    path.resolve(__dirname, "../id.json")
  );
  console.log("✅", local_account.publicKey.toBase58());

  // generate keypair
  // const keypair = web3.Keypair.generate();
  // console.log(keypair.publicKey.toBase58())

  // connection rpc
  // 'devnet' | 'testnet' | 'mainnet-beta'
  // const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

  // Processed Slot: 160733 | Confirmed Slot: 160733 | Finalized Slot: 160701
  // processed 验证节点处理过，但还没有被确认
  // confirmed 被大多数节点确认
  // finalized 不可逆

  const endpoint: string = "http://127.0.0.1:8899";
  const connection: web3.Connection = new web3.Connection(
    endpoint,
    "confirmed"
  );
  console.log(`✅ Connected! `);

  // init PublicKey obj & log user info
  //const address = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
  const local_account_publickey: web3.PublicKey = local_account.publicKey;
  const local_account_info: web3.AccountInfo<Buffer> | null =
    await connection.getAccountInfo(local_account_publickey);
  // console.log(local_account_info)

  // Unit conversion
  const local_account_balance: number = await connection.getBalance(
    local_account_publickey
  );
  const local_account_balanceInSol: number =
    local_account_balance / web3.LAMPORTS_PER_SOL;
  console.log("💰", local_account_balanceInSol);

  //Transaction
  const transaction: web3.Transaction = new web3.Transaction();

  const other_account_publickey: web3.PublicKey = new web3.PublicKey(
    "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN"
  );

  const sendSolInstruction: web3.TransactionInstruction =
    web3.SystemProgram.transfer({
      fromPubkey: local_account_publickey,
      toPubkey: other_account_publickey,
      lamports: web3.LAMPORTS_PER_SOL * 10,
    });

  transaction.add(sendSolInstruction);

  // signature
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [local_account]
  );

  const other_account_balanceInSol: number =
    (await connection.getBalance(other_account_publickey)) /
    web3.LAMPORTS_PER_SOL;
  console.log("💰", other_account_balanceInSol);

  // mint
  const tokenMint = await token.createMint(
    connection,
    local_account,
    local_account_publickey,
    local_account_publickey,
    2
  );

  const mint_link = helpers.getExplorerLink(
    "address",
    tokenMint.toString(),
    "localnet"
  );

  console.log(`✅ Finished! Created token mint: ${mint_link}`);

  // mint account
  const tokenMintAccount = new web3.PublicKey(tokenMint.toString());
  const recipient = local_account.publicKey;

  const tokenAccount = await token.getOrCreateAssociatedTokenAccount(
    connection,
    local_account,
    tokenMintAccount,
    recipient
  );

  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

  const mint_account_link = helpers.getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "localnet"
  );

  console.log(`✅ Created token Account: ${mint_account_link}`);

  //mint token to mintaccount
  const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

  // Substitute in your own, or a friend's token account address, based on the previous step.
  const recipientAssociatedTokenAccount = new web3.PublicKey(
    tokenAccount.address.toBase58()
  );

  const transactionSignature = await token.mintTo(
    connection,
    local_account,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    local_account,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );

  const tokenlink = helpers.getExplorerLink(
    "transaction",
    transactionSignature,
    "localnet"
  );

  console.log(`✅ Success! Mint Token Transaction: ${tokenlink}`);



  // transfer
  // Transfer the tokens

  //const sender = getKeypairFromEnvironment("SECRET_KEY");

// console.log(
//   `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
// );

// Add the recipient public key here.
const token_recipient = other_account_publickey;

// Subtitute in your token mint account
// const tokenMintAccount = new PublicKey("YOUR_TOKEN_MINT_ADDRESS_HERE");

// Our token has two decimal places
// const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

// console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);

// Get or create the source and destination token accounts to store this token
const sourceTokenAccount = await token.getOrCreateAssociatedTokenAccount(
  connection,
  local_account,//
  tokenMintAccount,
  local_account.publicKey
);

const destinationTokenAccount = await token.getOrCreateAssociatedTokenAccount(
  connection,
  local_account,
  tokenMintAccount,
  token_recipient
);

// Transfer the tokens
const token_signature = await token.transfer(
  connection,
  local_account,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  local_account,
  1 * MINOR_UNITS_PER_MAJOR_UNITS
);

const explorerLink = helpers.getExplorerLink("transaction", token_signature, "localnet");

console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);

  // ---
  console.log("✅ program end");
}

// ---
main();
