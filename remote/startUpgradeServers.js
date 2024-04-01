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
  ns.disableLog('ALL')
  let ram = ns.args[0]

  if (!Number.isInteger(ram)) {
    ns.tprint('ERROR: Please give a valid amount of starting RAM')
    return
  }

  const cost = ns.getPurchasedServerCost(ram)

  if (cost == Infinity) {
    ns.tprint('ERROR: Please give a valid amount of starting RAM')
    return
  }

  while (true) {
    const availableRam =
      ns.getServerMaxRam(ns.getHostname()) -
      ns.getServerUsedRam(ns.getHostname())

    if (availableRam < ns.getScriptRam('remote/upgradeAndHack.js')) {
      ns.tprint(
        `WARN: Upgrade scripts started up to ${
          ram / 2
        }Gb. Out of memory. Exiting...`
      )
      break
    }

    ns.print(`Started upgrade script for ${ram}Gb`)
    ns.exec('remote/upgradeAndHack.js', 'home', 1, ram)

    if (ram == 1048576) {
      ns.tprint(`SUCCESS: Upgrade scripts started to max RAM value`)
      break
    }

    const newAvailableRam =
      ns.getServerMaxRam(ns.getHostname()) -
      ns.getServerUsedRam(ns.getHostname())

    if (newAvailableRam < ns.getScriptRam('remote/upgradeAndHack.js')) {
      ns.tprint(
        `WARN: Upgrade scripts started up to ${ram}Gb. Out of memory. Exiting...`
      )
      break
    }

    await ns.sleep(500)

    ram = ram * 2
  }
}
