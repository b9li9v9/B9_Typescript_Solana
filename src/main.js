"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3 = require("@solana/web3.js");
var helpers = require("@solana-developers/helpers");
var token = require("@solana/spl-token");
var path = require("path");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var local_account, connection, local_account_publickey, local_account_info, local_account_balance, local_account_balanceInSol, transaction, other_account_publickey, sendSolInstruction, signature, other_account_balanceInSol, tokenMint, link;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers.getKeypairFromFile(path.resolve(__dirname, "../keypair/id.json"))];
                case 1:
                    local_account = _a.sent();
                    console.log("✅", local_account.publicKey.toBase58());
                    connection = new web3.Connection("http://127.0.0.1:8899", "finalized");
                    console.log("\u2705 Connected! ");
                    local_account_publickey = local_account.publicKey;
                    return [4 /*yield*/, connection.getAccountInfo(local_account_publickey)];
                case 2:
                    local_account_info = _a.sent();
                    return [4 /*yield*/, connection.getBalance(local_account_publickey)];
                case 3:
                    local_account_balance = _a.sent();
                    local_account_balanceInSol = local_account_balance / web3.LAMPORTS_PER_SOL;
                    console.log("💰", local_account_balanceInSol);
                    transaction = new web3.Transaction();
                    other_account_publickey = new web3.PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");
                    sendSolInstruction = web3.SystemProgram.transfer({
                        fromPubkey: local_account_publickey,
                        toPubkey: other_account_publickey,
                        lamports: web3.LAMPORTS_PER_SOL * 10
                    });
                    transaction.add(sendSolInstruction);
                    return [4 /*yield*/, web3.sendAndConfirmTransaction(connection, transaction, [local_account])];
                case 4:
                    signature = _a.sent();
                    return [4 /*yield*/, connection.getBalance(other_account_publickey)];
                case 5:
                    other_account_balanceInSol = (_a.sent()) / web3.LAMPORTS_PER_SOL;
                    console.log("💰", other_account_balanceInSol);
                    return [4 /*yield*/, token.createMint(connection, local_account, local_account_publickey, null, 2)];
                case 6:
                    tokenMint = _a.sent();
                    link = helpers.getExplorerLink("address", tokenMint.toString(), "devnet");
                    console.log("\u2705 Finished! Created token mint: ".concat(link));
                    // ---
                    console.log("✅ program end");
                    return [2 /*return*/];
            }
        });
    });
}
// ---
main();