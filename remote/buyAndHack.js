import { startHacks } from 'lib/startHacks'

export function autocomplete(_data, args) {
  if (args.length == 0) {
    return [
      2, 4, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768,
      65536, 131072, 262144, 524288, 1048576,
    ]
  }
  return []
}

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog('ALL')
  const serverFile = ns.read('servers.txt')
  const ram = ns.args[0]

  if (!Number.isInteger(ram)) {
    ns.alert('Please give a valid amount of RAM')
    return
  }

  const cost = ns.getPurchasedServerCost(ram)

  if (cost == Infinity) {
    ns.alert('Please give a valid amount of RAM')
    return
  }

  ns.print(`Server cost is $${cost}.`)
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

    ns.print(`Purchasing server ${serverName} with ${ram}Gb of RAM.`)

    ns.purchaseServer(serverName, ram)
    ns.scp('hack.js', serverName)

    startHacks(ns, serverName, servers, true)
  }
}
