import { expect } from "chai"
import { ethers } from "hardhat"

describe("guess-the-random-number", function () {
  it("should guess the random number", async function () {
    const chalAddr = ""

    const answer = await ethers.provider.getStorageAt(chalAddr, 0)

    const chal = await ethers.getContractAt("GuessTheRandomNumberChallenge", chalAddr)
    const tx = await chal.guess(answer, { value: ethers.utils.parseEther("1") })
    await tx.wait()

    expect(await chal.isComplete()).to.be.true
  })
})