import { expect } from "chai"
import { ethers } from "hardhat"

describe("guess-the-new-number", function () {
  it("should guess the new number", async function () {
    const chalAddr = ""
    const solAddr = ""

    const sol = await ethers.getContractAt("GuessTheNewNumberChallengeSolver", solAddr)
    const tx = await sol.guess(chalAddr, { value: ethers.utils.parseEther("1") })
    await tx.wait()

    const tx2 = await sol.withdraw()
    await tx2.wait()

    const chal = await ethers.getContractAt("GuessTheNewNumberChallenge", chalAddr)

    expect(await chal.isComplete()).to.be.true
  })
})