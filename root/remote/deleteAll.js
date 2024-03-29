/** @param {NS} ns */
export async function main(ns) {
  const args = ns.args
  if (!args[0]) {
    ns.alert(
      'Are you sure you want to delete all servers? Add an arg and try again.'
    )
    return
  }
  const myServers = ns.getPurchasedServers()

  for (const myServer of myServers) {
    ns.deleteServer(myServer)
  }
}
