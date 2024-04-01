/**
 * @param {NS} ns
 */
export async function main(ns) {
  const myServers = ns.getPurchasedServers()

  for (const myServer of myServers) {
    ns.killall(myServer)
  }
}
