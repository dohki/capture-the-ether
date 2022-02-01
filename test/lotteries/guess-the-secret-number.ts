import { expect } from "chai"
import { ethers } from "hardhat"

describe("guess-the-secret-number", function () {
  it("should guess the secret number", async function () {
    const chalAddr = ""

    const answerHash =
      "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365"
    let answer = -1
    for (let i = 0; i < 0x100; i++) {
      if (ethers.utils.keccak256(ethers.utils.hexlify(i)) == answerHash) {
        answer = i
        break
      }
    }
    expect(answer).not.to.equal(-1)

    const chal = await ethers.getContractAt("GuessTheSecretNumberChallenge", chalAddr)
    const tx = await chal.guess(answer, { value: ethers.utils.parseEther("1") })
    await tx.wait()

    expect(await chal.isComplete()).to.be.true
  })
})