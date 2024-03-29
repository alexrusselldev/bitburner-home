/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0]

  if (ns.fileExists('BruteSSH.exe')) {
    ns.brutessh(server)
  }
  if (ns.fileExists('FTPCrack.exe')) {
    ns.ftpcrack(server)
  }
  if (ns.fileExists('HTTPWorm.exe')) {
    ns.httpworm(server)
  }
  if (ns.fileExists('SQLInject.exe')) {
    ns.sqlinject(server)
  }
  if (ns.fileExists('relaySMTP.exe')) {
    ns.relaysmtp(server)
  }

  ns.nuke(server)

  const servers = ns.read('servers.txt')

  ns.write('servers.txt', `\n${server}`)
}
