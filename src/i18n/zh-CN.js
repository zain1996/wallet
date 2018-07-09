import zxcvbnConvert from 'lib/zxcvbn-convert'
import { errorConvert } from 'lib/error'

const zxcvbn = {
  'Use a few words, avoid common phrases': '请使用若干个词语，避免常见短语',
  'No need for symbols, digits, or uppercase letters': '不需要符号、数字、大写字母',
  'Add another word or two. Uncommon words are better.': '请添加一个或两个词，最好是不常见的词',
  'Straight rows of keys are easy to guess': '键盘上相邻的几个键很容易被猜到',
  'Short keyboard patterns are easy to guess': '较短的键组合很容易被猜到',
  'Use a longer keyboard pattern with more turns': '请使用更长的键组合',
  'Repeats like "aaa" are easy to guess': '类似aaa这样的重复很容易被猜到',
  'Repeats like "abcabcabc" are only slightly harder to guess than "abc"': '类似abcabcabc这样的重复只比abc难猜一点点',
  'Avoid repeated words and characters': '避免重复的词或字符',
  'Sequences like abc or 6543 are easy to guess': '类似abc或6543这样的序列很容易被猜到',
  'Avoid sequences': '请避免使用序列',
  'Recent years are easy to guess': '最近的年份很容易被猜到',
  'Avoid recent years': '请避免使用最近的年份',
  'Avoid years that are associated with you': '请避免使用和你有关的年份',
  'Dates are often easy to guess': '日期很容易被猜到',
  'Avoid dates and years that are associated with you': '请避免使用和你有关的日期和年份',
  'This is a top-10 common password': '这是一个Top 10的常见密码',
  'This is a top-100 common password': '这是一个Top 100的常见密码',
  'This is a very common password': '这是一个非常常见的密码',
  'This is similar to a commonly used password': '与一个常用的密码有点相似',
  'A word by itself is easy to guess': '单词本身很容易被猜到',
  'Names and surnames by themselves are easy to guess': '姓名很容易被猜到',
  'Common names and surnames are easy to guess': '常见的姓名很容易被猜到',
  "Capitalization doesn't help very much": '单词首字母大写形式没有太多帮助',
  'All-uppercase is almost as easy to guess as all-lowercase': '全大写形式并不比全小写形式难猜',
  "Reversed words aren't much harder to guess": '保留的单词不是很难猜',
  "Predictable substitutions like '@' instead of 'a' don't help very much": '使用类似@来替代a这样的可预测替没有太多帮助'
}

const errors = {
  0: '服务器错误',
  1: '账号名已存在',
  2: '账号名不存在',
  3: '账号名格式不正确',
  4: '公钥格式非法',
  5: '发送交易失败',
  6: '没有找到钱包',
  7: '共享钱包的多签人已满',
  8: '找不到此货币'
}

export default {
  nav: {
    home: '主页',
    market: '市场',
    discovery: '探索',
    profile: '我'
  },

  inviteCopayers: {
    shareInvitationWithYourCopayers: '请分享如下邀请密钥给此钱包的共同拥有者',
    cancelInvitation: '取消邀请',
    waitingForCopayers: '正在等待钱包的其它拥有者加入',
    me: '我',
    waiting: '等待中...',
    confirmToCancelAndDeleteWallet: '确定要取消和删除此钱包吗？'
  },

  confirm: '确认',
  ok: '确定',
  cancel: '取消',
  copied: '已复制',
  nextStep: '下一步',
  gotIt: '知道了',
  comingSoon: '敬请期待',
  import: '导入',
  inputPassword: '请输入密码',

  language: '语言',
  currencyUnit: '货币单位',

  createWallet: '创建钱包',
  addWallet: '添加钱包',
  createPersonalWallet: '创建钱包',
  createSharedWallet: '创建共享钱包',
  joinSharedWallet: '加入共享钱包',
  importWallet: '导入钱包',
  removeWallet: '删除钱包',

  walletName: '钱包名称',
  setPassword: '设置密码',
  setPasswordHelp: '密码用于加密私钥数据，即使手机丢失，也能确保私钥不被盗窃',
  password: '密码',
  repeatPassword: '重复密码',
  passwordHint: '密码提示信息（选填）',
  myName: '您的名字',
  totalCopayers: '多重签名的总人数',
  requiredCopayers: '多重签名的必需人数',
  coin: '资产',
  selectCoin: '选择资产',

  showAdvancedOptions: '显示高级选项',
  hideAdvancedOptions: '隐藏高级选项',

  readAndAgree: '我已经仔细阅读并同意',
  termsOfServiceAndPrivacyPolicy: '服务及隐私条款',

  backupWallet: '备份钱包',
  backupWalletHint: '没有妥善备份就无法保障资产安全。删除软件或钱包后，你需要备份文件来恢复钱包。',
  backupMnemonic: '备份助记词',
  backupMnemonicHint: '请仔细抄写下方助记词，我们将在下一步验证。',
  doNotPrintScreen: '请勿截屏',
  doNotPrintScreenHint: '如果有人获取你的助记词将直接获取你的资产！请抄写下助记词并存放在安全的地方。',
  validateMnemonic: '确认助记词',
  validateMnemonicHint: '请按顺序点击助记词，以确认您正确备份。',
  validateMnemonicError: '助记词顺序不正确，请校对',
  backupFailed: '备份失败',
  backupFailedHint: '请检查你的助记词',
  backupSucceeded: '备份成功',
  backupSucceededHint: '你备份的助记词验证正确，是否从Cochain移除该助记词',
  importMnemonicHint: '输入助记词，按回车键或点击提示选项',
  mnemonic: '助记词',
  mnemonicLanguage: '助记词语言',
  mnemonicLanguages: {
    chinese: '简体中文',
    english: '英语',
    french: '法语',
    italian: '意大利语',
    japanese: '日语',
    spanish: '西班牙语'
  },

  createWalletGuideTitle: '选择一种数字货币 <br> 创建或导入你的钱包',

  privateKey: '私钥',
  publicKey: '公钥',
  observer: '观察',

  currencySymbol: '￥',
  asset: '资产',
  totalAssets: '总资产',

  scan: '扫码',
  send: '转账',
  receive: '收款',

  error: {
    emptyWalletName: '钱包名称不能为空',
    emptyMyName: '您的姓名不能为空',
    inconsistentPassword: '密码不一致',
    walletAlreadyExists: '钱包已经存在',

    ...errorConvert(errors)
  },

  zxcvbn: {
    scoreTooGuessable: '不安全',
    scoreVeryGuessable: '弱',
    scoreSomewhatGuessable: '一般',
    scoreSafelyUnguessable: '强',
    scoreVeryUnguessable: '极强',
    ...zxcvbnConvert(zxcvbn)
  }
}
