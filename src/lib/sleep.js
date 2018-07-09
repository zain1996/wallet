function randomInt (max) {
  return Math.floor((Math.random() / 2 + 1) * Math.floor(max))
}

export default function sleep (ms, random = false) {
  const delayMs = random ? randomInt(ms) : ms
  return new Promise(resolve => {
    setTimeout(resolve, delayMs)
  })
}
