/** @param {NS} ns */
export async function main(ns) {
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

  ns.alert(`Cost: \$${cost}`)
}
