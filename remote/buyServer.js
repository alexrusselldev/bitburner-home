/** @param {NS} ns */
export async function main(ns) {
  const currentServers = ns.getPurchasedServers()
  const ram = ns.args[0]

  if (!Number.isInteger(ram)) {
    ns.alert('Please give a valid amount of RAM')
    return
  }

  const cost = ns.getPurchasedServerCost(ram)
  const player = ns.getPlayer()
  const availableFunds = player.money

  if (cost == Infinity) {
    ns.alert('Please give a valid amount of RAM')
    return
  }

  if (cost > availableFunds) {
    ns.alert(`You do not have enough money. Cost: \$${cost}`)
  }

  ns.purchaseServer(`server-${currentServers.length + 1}`, ram)
}
