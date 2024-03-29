/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0]
  const silent = ns.args[1]
  const minSecurity = ns.getServerMinSecurityLevel(server)
  const maxMoney = ns.getServerMaxMoney(server)
  let begunGrowing = false
  let begunHacking = false

  let i = 0
  while (true) {
    // get security below 1.5 before doing anything else
    while (true) {
      const security = ns.getServerSecurityLevel(server)

      if (security > minSecurity + 0.5) {
        await ns.weaken(server)
        continue
      }

      if (!begunGrowing && !silent) {
        ns.alert(
          `Security level below threshold for ${server}. Beginning growing loop.`
        )
        begunGrowing = true
      }

      break
    }

    // ensure server has enough money to be worth hacking
    while (true) {
      const availableMoney = ns.getServerMoneyAvailable(server)

      if (maxMoney * 0.9 > availableMoney) {
        await ns.grow(server)

        const security = ns.getServerSecurityLevel(server)
        if (security > minSecurity + 0.5) {
          break
        }
        continue
      }

      if (!begunHacking && !silent) {
        ns.alert(
          `Available money above threshold for ${server}. Beginning main loop.`
        )
        begunHacking = true
      }

      break
    }

    const security = ns.getServerSecurityLevel(server)
    const availableMoney = ns.getServerMoneyAvailable(server)

    if (security <= minSecurity + 0.5 && availableMoney >= maxMoney * 0.9) {
      await ns.hack(server)
    }
  }

  i++
}
