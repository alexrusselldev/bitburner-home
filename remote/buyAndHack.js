import { startHacks } from 'lib/startHacks'

/** @param {NS} ns */
export async function main(ns) {
  const serverFile = ns.read(ns.args[0])
  const ram = ns.args[1]

  if (!Number.isInteger(ram)) {
    ns.alert('Please give a valid amount of RAM')
    return
  }

  const cost = ns.getPurchasedServerCost(ram)

  if (cost == Infinity) {
    ns.alert('Please give a valid amount of RAM')
    return
  }

  const servers = serverFile.split('\n')
  while (true) {
    const myServers = ns.getPurchasedServers()
    const money = ns.getPlayer().money
    if (money < cost) {
      await ns.sleep(5000)
      continue
    }

    const serverName = `server-${myServers.length < 9 ? '0' : ''}${
      myServers.length + 1
    }`

    ns.purchaseServer(serverName, ram)
    ns.scp('hack.js', serverName)

    startHacks(ns, serverName, servers, true)
  }
}
