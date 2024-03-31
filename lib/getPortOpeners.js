/**
 * @param {NS} ns
 */
function getPortOpeners(ns) {
  const portOpeners = [
    { fileName: 'BruteSSH.exe', function: ns.brutessh },
    { fileName: 'FTPCrack.exe', function: ns.ftpcrack },
    { fileName: 'HTTPWorm.exe', function: ns.httpworm },
    { fileName: 'SQLInject.exe', function: ns.sqlinject },
    { fileName: 'relaySMTP.exe', function: ns.relaysmtp },
  ]

  return portOpeners
    .map((portOpener) => {
      if (ns.fileExists(portOpener.fileName)) {
        return portOpener.function
      }
      return false
    })
    .filter((item) => item)
}
