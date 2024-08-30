import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
import { expect } from "chai";
const { SystemProgram } = anchor.web3;

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  // Referencing the program - Abstraction that allows us to call methods of our SOL program.
  const program = anchor.workspace.Calculator as Program<Calculator>;
  const programProvider = program.provider as anchor.AnchorProvider;

  // Generating a key-pair for our Calculator account
  const calculatorPair = anchor.web3.Keypair.generate();

  const text = "This is initial message!";

  // TEST BLOCK
  it("Creation", async () => {
    // Calling create instance - Set our calculator key-pair as a signer
    await program.methods
      .create(text)
      .accounts({
        calculator: calculatorPair.publicKey,
        user: programProvider.wallet.publicKey,
      })
      .signers([calculatorPair])
      .rpc();

    // We fetch that account and read if the string is actually in the account
    const account = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );
    expect(account.greeting).to.eql(text);
  });

  // TEST BLOCK
  it("Addition", async () => {
    await program.methods
      .add(new anchor.BN(2), new anchor.BN(3))
      .accounts({
        calculator: calculatorPair.publicKey,
      })
      .rpc();

    const account = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );
    expect(account.result).to.eql(new anchor.BN(5));
  });
});
