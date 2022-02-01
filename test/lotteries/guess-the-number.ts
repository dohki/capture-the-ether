import { expect } from "chai"
import { ethers } from "hardhat"

describe("guess-the-number", function () {
  it("should guess the number", async function () {
    const chalAddr = ""

    const chal = await ethers.getContractAt("GuessTheNumberChallenge", chalAddr)
    const tx = await chal.guess(42, { value: ethers.utils.parseEther("1") })
    await tx.wait()

    expect(await chal.isComplete()).to.be.true
  })
})