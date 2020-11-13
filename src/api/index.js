/**
 * api接口的统一出口
 */

import home from './home'
import user from './user'
import expert from './expert'
import app from './app'
import ask from './ask'

// app模块接口

// 其他模块的接口……

// 导出接口
export default {
  home,
  user,
  expert,
  app,
  ask
  // ……
}
