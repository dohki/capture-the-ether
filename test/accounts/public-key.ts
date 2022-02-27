import { expect } from "chai"
import { ethers } from "hardhat"

describe("public-key", function () {
  it("should find the public key for the owner's account", async function () {
    const chalAddr = ""

    const chalName = "PublicKeyChallenge"
    const chal = await ethers.getContractAt(chalName, chalAddr)

    const ownerAddr = ethers.utils.hexStripZeros(
      await ethers.provider.getStorageAt(chalAddr, 0)
    )
    const etherscan = new ethers.providers.EtherscanProvider("ropsten")
    const txs = await etherscan.getHistory(ownerAddr)
    const outTxs = txs.filter(tx => tx.from.toLowerCase() === ownerAddr)
    expect(outTxs.length).to.be.greaterThan(0)

    const tx = await ethers.provider.getTransaction(outTxs[0].hash)
    if (tx.r === undefined) {
      expect(false)
      return
    }

    const rawTxSig = ethers.utils.joinSignature({r: tx.r, s: tx.s, v: tx.v})

    const serTx = ethers.utils.serializeTransaction({
      nonce: tx.nonce,
      gasPrice: tx.gasPrice,
      gasLimit: tx.gasLimit,
      to: tx.to,
      value: tx.value,
      data: tx.data,
      chainId: tx.chainId,
    })
    const hash = ethers.utils.arrayify(
      ethers.utils.keccak256(serTx)
    )

    const pubKey = ethers.utils.hexDataSlice(
      ethers.utils.recoverPublicKey(hash, rawTxSig), 1
    )
    const addr = ethers.utils.hexDataSlice(
      ethers.utils.keccak256(pubKey), 12
    )
    expect(addr).to.equal(ownerAddr)

    const tx1 = await chal.authenticate(pubKey)
    await tx1.wait()

    expect(await chal.isComplete()).to.be.true
  })
})