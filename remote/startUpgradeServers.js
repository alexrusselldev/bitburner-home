/** @param {NS} ns */
export async function main(ns) {
  let ram = 256

  while (true) {
    ns.exec('remote/upgradeAndHack.js', 'home', 1)

    if (ram == 1048576) {
      break
    }

    await ns.sleep(10000)

    ram = ram * 2
  }
}
