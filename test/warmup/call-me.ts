import { expect } from "chai"
import { ethers } from "hardhat"

describe("call-me", function () {
  it("should call", async function () {
    const chalAddr = ""

    const chal = await ethers.getContractAt("CallMeChallenge", chalAddr)
    const tx = await chal.callme()
    await tx.wait()

    expect(await chal.isComplete()).to.be.true
  })
})