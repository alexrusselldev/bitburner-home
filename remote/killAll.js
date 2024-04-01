/**
 * @param {NS} ns
 * TODO: Disable default logging, add logging
 * TODO: Add terminal output success message
 */
export async function main(ns) {
  const myServers = ns.getPurchasedServers()

  for (const myServer of myServers) {
    ns.killall(myServer)
  }
}
