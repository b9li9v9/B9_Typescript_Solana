import * as web3 from "@solana/web3.js";
import * as helpers from "@solana-developers/helpers";
import * as token from "@solana/spl-token";
import * as path from "path";



async function main(): Promise<void> {
    // local load keypair
    const local_account: web3.Keypair = await helpers.getKeypairFromFile(path.resolve(__dirname, "../keypair/id.json"));
    console.log("✅", local_account.publicKey.toBase58());

    // generate keypair
    // const keypair = web3.Keypair.generate();
    // console.log(keypair.publicKey.toBase58())

    // connection rpc
    // 'devnet' | 'testnet' | 'mainnet-beta'
    // const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const connection = new web3.Connection("http://127.0.0.1:8899");
    console.log(`✅ Connected! `)

    // init PublicKey obj & log user info
    //const address = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
    const local_account_publickey = local_account.publicKey;
    const local_account_info = await connection.getAccountInfo(local_account_publickey);
    // console.log(local_account_info)

    // Unit conversion
    const local_account_balance = await connection.getBalance(local_account_publickey);
    const local_account_balanceInSol = local_account_balance / web3.LAMPORTS_PER_SOL;
    console.log("💰", local_account_balanceInSol)

    //Transaction
    const transaction = new web3.Transaction()

    const other_account_publickey = new web3.PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN")


    const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: local_account_publickey,
        toPubkey: other_account_publickey,
        lamports: web3.LAMPORTS_PER_SOL * 10
    })

    transaction.add(sendSolInstruction)

    // signature
    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [local_account]
    )

    const other_account_balanceInSol = await connection.getBalance(other_account_publickey) / web3.LAMPORTS_PER_SOL;
    console.log("💰", other_account_balanceInSol)

    // ---
    console.log("✅ program end")
}

// ---
main()
