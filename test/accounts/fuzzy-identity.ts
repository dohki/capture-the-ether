import { expect } from "chai"
import { ethers } from "hardhat"

describe("fuzzy-identity", function () {
  it("should steal smarx's identity", async function () {
    const chalName = "FuzzyIdentityChallenge"
    let chal, solFactory
    if ((await ethers.provider.getNetwork()).chainId === 31337) {
      const chalFac = await ethers.getContractFactory(chalName)
      chal = await chalFac.deploy()
      await chal.deployed()

      const solFactoryFac =
        await ethers.getContractFactory(`${chalName}SolverFactory`)
      solFactory = await solFactoryFac.deploy()
      await solFactory.deployed()
    } else {
      const chalAddr = ""
      chal = await ethers.getContractAt(chalName, chalAddr)

      const solFactoryAddr = ""
      solFactory = await ethers.getContractAt(chalName, solFactoryAddr)
    }

    const solFac = await ethers.getContractFactory(`${chalName}Solver`)
    const initCodeHash = ethers.utils.keccak256(solFac.bytecode)

    let salt = 0
    while (true) {
      const salt32 = ethers.utils.hexZeroPad(ethers.utils.hexlify(salt), 32)
      const addr =
        ethers.utils.getCreate2Address(solFactory.address, salt32, initCodeHash)
      if (addr.toLowerCase().includes("badc0de"))
        break
      salt++
    }

    const tx1 = await solFactory.deploy(salt)
    const rx1 = await tx1.wait()

    const solAddr = rx1.events[0].args.addr
    const sol = await ethers.getContractAt(`${chalName}Solver`, solAddr)

    const tx2 = await sol.authenticate(chal.address)
    const rx2 = await tx2.wait()

    expect(await chal.isComplete()).to.be.true
  })
})