class Profile {
  version = '1.0.0'
  createdOn
  credentials
  disclaimerAccepted = false
  onboardingCompleted = false
  checked = {}
  checkedUA
  dirty

  static create (credentials) {
    const p = new Profile()
    p.createdOn = Date.now()
    p.credentials = credentials || []
    p.dirty = true
    return p
  }

  static from (obj) {
    const p = new Profile()
    p.createdOn = obj.createdOn
    p.credentials = obj.credentials
    p.disclaimerAccepted = obj.disclaimerAccepted
    p.onboardingCompleted = obj.onboardingCompleted
    p.checked = obj.checked || {}
    p.checkedUA = obj.checkedUA
    p.dirty = false
    return p
  }

  toObj () {
    const obj = { ...this }
    delete obj.dirty
    return obj
  }

  isChecked (ua, walletID) {
    return this.checkedUA === ua && this.checked[walletID]
  }

  isDeviceChecked (ua) {
    return this.checkedUA === ua
  }

  setChecked (ua, walletID) {
    if (this.checkedUA !== ua) {
      this.checkedUA = ua
      this.checked = {}
    }
    this.checked[walletID] = true
    this.dirty = true
  }

  hasWallet (walletID) {
    const index = this.credentials.findIndex(c => c.walletID === walletID)
    return index > -1
  }

  addWallet (credential) {
    if (!credential.walletID) throw new Error('credential must have field `walletID`')

    if (this.hasWallet(credential.walletID)) return false

    this.credentials.push(credential)
    this.dirty = true
    return true
  }

  updateWallet (credential) {
    if (!credential.walletID) throw new Error('credentials must have field `walletId`')

    const index = this.credentials.findIndex(c => c.walletID === credential.walletID)
    if (index < 0) return false

    this.credentials[index] = credential
    this.dirty = true
    return true
  }

  deleteWallet (walletID) {
    const credentials = this.credentials.filter(c => {
      return c.walletID !== walletID
    })
    if (credentials.length === this.credentials.length) return false

    this.credentials = credentials
    this.dirty = true
    return true
  }
}

export default Profile
