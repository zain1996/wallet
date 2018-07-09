import zxcvbnConvert from 'lib/zxcvbn-convert'
import { errorConvert } from 'lib/error'

const zxcvbn = {
  'Use a few words, avoid common phrases': 'Use a few words, avoid common phrases',
  'No need for symbols, digits, or uppercase letters': 'No need for symbols, digits, or uppercase letters',
  'Add another word or two. Uncommon words are better.': 'Add another word or two. Uncommon words are better.',
  'Straight rows of keys are easy to guess': 'Straight rows of keys are easy to guess',
  'Short keyboard patterns are easy to guess': 'Short keyboard patterns are easy to guess',
  'Use a longer keyboard pattern with more turns': 'Use a longer keyboard pattern with more turns',
  'Repeats like "aaa" are easy to guess': 'Repeats like "aaa" are easy to guess',
  'Repeats like "abcabcabc" are only slightly harder to guess than "abc"': 'Repeats like "abcabcabc" are only slightly harder to guess than "abc"',
  'Avoid repeated words and characters': 'Avoid repeated words and characters',
  'Sequences like abc or 6543 are easy to guess': 'Sequences like abc or 6543 are easy to guess',
  'Avoid sequences': 'Avoid sequences',
  'Recent years are easy to guess': 'Recent years are easy to guess',
  'Avoid recent years': 'Avoid recent years',
  'Avoid years that are associated with you': 'Avoid years that are associated with you',
  'Dates are often easy to guess': 'Dates are often easy to guess',
  'Avoid dates and years that are associated with you': 'Avoid dates and years that are associated with you',
  'This is a top-10 common password': 'This is a top-10 common password',
  'This is a top-100 common password': 'This is a top-100 common password',
  'This is a very common password': 'This is a very common password',
  'This is similar to a commonly used password': 'This is similar to a commonly used password',
  'A word by itself is easy to guess': 'A word by itself is easy to guess',
  'Names and surnames by themselves are easy to guess': 'Names and surnames by themselves are easy to guess',
  'Common names and surnames are easy to guess': 'Common names and surnames are easy to guess',
  "Capitalization doesn't help very much": "Capitalization doesn't help very much",
  'All-uppercase is almost as easy to guess as all-lowercase': 'All-uppercase is almost as easy to guess as all-lowercase',
  "Reversed words aren't much harder to guess": "Reversed words aren't much harder to guess",
  "Predictable substitutions like '@' instead of 'a' don't help very much": "Predictable substitutions like '@' instead of 'a' don't help very much"
}

const errors = {
  0: 'Server error',
  1: 'Existing account name',
  2: 'Nonexistent account name',
  3: 'Invalid account name',
  4: 'Invalid public key',
  5: 'Failed to push transaction',
  6: 'Wallet not found',
  7: 'Cannot add cosigner to a complete wallet',
  8: 'Currency not found'
}

export default {
  nav: {
    home: 'Home',
    market: 'Market',
    discovery: 'Discovery',
    profile: 'Profile'
  },

  inviteCopayers: {
    shareInvitationWithYourCopayers: 'Share this invitation with your co-payers',
    cancelInvitation: 'Cancel invitation',
    waitingForCopayers: 'Waiting for co-payers',
    me: 'Me',
    waiting: 'Waiting',
    confirmToCancelAndDeleteWallet: 'Are you sure you want to cancel and delete this wallet?'
  },

  confirm: 'Confirm',
  ok: 'OK',
  cancel: 'Cancel',
  copied: 'Copied to clipboard',
  nextStep: 'Next',
  gotIt: 'Got it',
  comingSoon: 'Coming soon',
  import: 'Import',
  inputPassword: 'Please input password',

  language: 'Language',
  currencyUnit: 'Currency unit',

  createWallet: 'Create Wallet',
  addWallet: 'Add Wallet',
  createPersonalWallet: 'Create Personal Wallet',
  createSharedWallet: 'Create Shared Wallet',
  joinSharedWallet: 'Join Shared Wallet',
  importWallet: 'Import Wallet',
  removeWallet: 'Remove Wallet',

  walletName: 'Wallet name',
  setPassword: 'Set password',
  setPasswordHelp: '', // TODO
  password: 'Password',
  repeatPassword: 'Repeat password',
  passwordHint: 'Password hint (Optional)',
  myName: 'Your name',
  totalCopayers: 'Total number of co-payers',
  requiredCopayers: 'Required number of signatures',
  coin: 'Coin',
  selectCoin: 'Select Coin',

  showAdvancedOptions: 'Show advanced options',
  hideAdvancedOptions: 'Hide advanced options',

  readAndAgree: 'I have read and agree to',
  termsOfServiceAndPrivacyPolicy: 'Terms of Service and Privacy Policy',

  backupWallet: 'Backup wallet',
  backupWalletHint: '', // TODO
  backupMnemonic: 'Backup mnemonic',
  backupMnemonicHint: '', // TODO
  doNotPrintScreen: 'Do not print screen',
  doNotPrintScreenHint: '', // TODO
  validateMnemonic: 'Confirm mnemonic',
  validateMnemonicHint: '', // TODO
  validateMnemonicError: '', // TODO
  backupFailed: 'Backup failed',
  backupFailedHint: 'Please check your mnemonic',
  backupSucceeded: 'Backup succeeded',
  backupSucceededHint: 'Your backup mnemonic is validated. Remove it from Cochain?',
  importMnemonicHint: '', // TODO
  mnemonic: 'Mnemonic',
  mnemonicLanguage: 'Mnemonic language',
  mnemonicLanguages: {
    chinese: 'Chinese',
    english: 'English',
    french: 'French',
    italian: 'Italian',
    japanese: 'Japanese',
    spanish: 'Spanish'
  },

  createWalletGuideTitle: 'Select a certain kind of coin <br> Create or import your wallet',

  privateKey: 'Private key',
  publicKey: 'Public key',
  observer: 'Observer',

  currencySymbol: '$',
  asset: 'Asset',
  totalAssets: 'Total assets',

  scan: 'Scan',
  send: 'Send',
  receive: 'Receive',

  error: {
    emptyWalletName: 'Empty wallet name',
    emptyMyName: 'Your name must be specified',
    inconsistentPassword: 'Inconsistent password',
    walletAlreadyExists: 'Wallet already exists',

    ...errorConvert(errors)
  },

  zxcvbn: {
    scoreTooGuessable: 'Too guessable',
    scoreVeryGuessable: 'Very guessable',
    scoreSomewhatGuessable: 'Somewhat guessable',
    scoreSafelyUnguessable: 'Safely unguessable',
    scoreVeryUnguessable: 'Very unguessable',
    ...zxcvbnConvert(zxcvbn)
  }
}
