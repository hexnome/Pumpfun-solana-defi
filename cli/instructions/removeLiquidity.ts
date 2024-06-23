import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RemoveLiquidityArgs {
  nonce: number
  initPcAmount: BN
}

export interface RemoveLiquidityAccounts {
  pool: PublicKey
  /** CHECK */
  globalAccount: PublicKey
  ammProgram: PublicKey
  tokenProgram: PublicKey
  associatedTokenProgram: PublicKey
  systemProgram: PublicKey
  sysvarRent: PublicKey
  amm: PublicKey
  ammAuthority: PublicKey
  ammOpenOrders: PublicKey
  lpMint: PublicKey
  coinMint: PublicKey
  pcMint: PublicKey
  coinVault: PublicKey
  pcVault: PublicKey
  targetOrders: PublicKey
  ammConfig: PublicKey
  feeDestination: PublicKey
  marketProgram: PublicKey
  market: PublicKey
  userWallet: PublicKey
  userTokenCoin: PublicKey
  userTokenPc: PublicKey
  userTokenLp: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("nonce"),
  borsh.u64("initPcAmount"),
])

export function removeLiquidity(
  args: RemoveLiquidityArgs,
  accounts: RemoveLiquidityAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.pool, isSigner: false, isWritable: true },
    { pubkey: accounts.globalAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.ammProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associatedTokenProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.sysvarRent, isSigner: false, isWritable: false },
    { pubkey: accounts.amm, isSigner: false, isWritable: true },
    { pubkey: accounts.ammAuthority, isSigner: false, isWritable: false },
    { pubkey: accounts.ammOpenOrders, isSigner: false, isWritable: true },
    { pubkey: accounts.lpMint, isSigner: false, isWritable: true },
    { pubkey: accounts.coinMint, isSigner: false, isWritable: true },
    { pubkey: accounts.pcMint, isSigner: false, isWritable: true },
    { pubkey: accounts.coinVault, isSigner: false, isWritable: true },
    { pubkey: accounts.pcVault, isSigner: false, isWritable: true },
    { pubkey: accounts.targetOrders, isSigner: false, isWritable: true },
    { pubkey: accounts.ammConfig, isSigner: false, isWritable: true },
    { pubkey: accounts.feeDestination, isSigner: false, isWritable: true },
    { pubkey: accounts.marketProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.market, isSigner: false, isWritable: true },
    { pubkey: accounts.userWallet, isSigner: true, isWritable: true },
    { pubkey: accounts.userTokenCoin, isSigner: false, isWritable: true },
    { pubkey: accounts.userTokenPc, isSigner: false, isWritable: true },
    { pubkey: accounts.userTokenLp, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([80, 85, 209, 72, 24, 206, 177, 108])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      nonce: args.nonce,
      initPcAmount: args.initPcAmount,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
