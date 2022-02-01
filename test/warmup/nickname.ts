import { expect } from "chai"
import { ethers } from "hardhat"

describe("nickname", function () {
  it("should set nickname", async function () {
    const chalAddr = ""
    const nickname = ""

    const cteAddr = "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee"
    const cte = await ethers.getContractAt("CaptureTheEther", cteAddr)
    const tx = await cte.setNickname(ethers.utils.formatBytes32String(nickname))
    await tx.wait()

    const chal = await ethers.getContractAt("NicknameChallenge", chalAddr)

    expect(await chal.isComplete()).to.be.true
  })
})