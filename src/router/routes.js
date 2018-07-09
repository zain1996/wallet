export default [
  {
    path: '/',
    component: () => import('layouts/HomeLayout'),
    children: [
      { path: '', component: () => import('pages/Home') }
    ]
  },

  {
    path: '/market',
    component: () => import('layouts/HomeLayout'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },

  {
    path: '/discovery',
    component: () => import('layouts/HomeLayout'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },

  {
    path: '/profile',
    component: () => import('pages/Profile')
  },

  { path: '/wallet/create-guide', component: () => import('pages/Wallet/CreateWalletGuide') },
  { path: '/wallet/detail', component: () => import('pages/Wallet/Detail') },
  { path: '/wallet/create', component: () => import('pages/Wallet/Create') },
  { path: '/wallet/backup-guide', component: () => import('pages/Wallet/BackupWallet/BackupWalletGuide') },
  { path: '/wallet/backup-mnemonic', component: () => import('pages/Wallet/BackupWallet/BackupMnemonic') },
  { path: '/wallet/validate-mnemonic', component: () => import('pages/Wallet/BackupWallet/ValidateMnemonic') },
  { path: '/wallet/import', component: () => import('pages/Wallet/ImportWallet') },
  { path: '/wallet/setting', component: () => import('pages/Wallet/Setting') },
  { path: '/settings', component: () => import('pages/Setting/Index') },
  { path: '/settings/language', component: () => import('pages/Setting/Language') },
  { path: '/settings/currency-unit', component: () => import('pages/Setting/CurrencyUnit') },
  // 转款
  { path: '/send', component: () => import('pages/Send/Index') },
  { path: '/send/set-amount', component: () => import('pages/Send/SetAmount') },
  // 收款
  { path: '/receive', component: () => import('pages/Receive') },
  { path: '/receive/set-amount', component: () => import('pages/Receive/SetAmount') },
  // 交易记录
  { path: '/record', component: () => import('pages/Record/Index') },
  { path: '/record/detail', component: () => import('pages/Record/Detail') },
  // 联系人
  { path: '/contacts', component: () => import('pages/Contacts/Index') },
  { path: '/contacts/contacts-detail', component: () => import('pages/Contacts/ContactsDetail') },
  { path: '/contacts/contacts-add', component: () => import('pages/Contacts/ContactsAdd') },
  { path: '/contacts/set-amount', component: () => import('pages/Contacts/SetAmount') },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
