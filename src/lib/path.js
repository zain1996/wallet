export default {
  join (a, ...p) {
    let path = a
    for (const b of p) {
      if (path === '' || path.endsWith('/')) path += b
      else path += '/' + b
    }
    return path
  },

  basename (p) {
    const i = p.lastIndexOf('/') + 1
    return p.substr(i)
  },

  dirname (p) {
    const i = p.lastIndexOf('/') + 1
    let head = p.substring(0, i)
    const len = head.length
    if (head && head !== '/' && head[len - 1] === '/') head = p.substring(0, len - 1)
    return head
  }
}
