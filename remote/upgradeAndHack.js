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

/**
 * @param {NS} ns
 */
export async function main(ns) {
  const ram = ns.args[0]

  if (!Number.isInteger(ram)) {
    ns.alert('Please give a valid amount of RAM')
    return
  }

  const purchaseCost = ns.getPurchasedServerCost(ram)

  if (purchaseCost == Infinity) {
    ns.alert('Please give a valid amount of RAM')
    return
  }

  const servers = ns.read('servers.txt').split('\n')
  const myServers = ns.getPurchasedServers()

  for (const myServer of myServers) {
    const cost = ns.getPurchasedServerUpgradeCost(myServer, ram)

    while (true) {
      if (cost == -1) {
        break
      }

      const availableMoney = ns.getPlayer().money
      if (availableMoney < cost) {
        await ns.sleep(5000)
        continue
      }

      break
    }

    if (cost > -1) {
      ns.upgradePurchasedServer(myServer, ram)
    }

    ns.killall(myServer)

    ns.scp('hack.js', myServer)

    startHacks(ns, myServer, servers, true)
  }

  ns.alert('All servers upgraded. Exiting.')
}
