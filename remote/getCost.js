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
    ns.tprint('ERROR: Please give a valid amount of RAM')
    return
  }

  const cost = ns.getPurchasedServerCost(ram)

  if (cost == Infinity) {
    ns.tprint('ERROR: Please give a valid amount of RAM')
    return
  }

  ns.tprint(`Size: ${ram}Gb`)
  ns.tprint(`Cost: \$${cost}`)
}
