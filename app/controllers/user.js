const userService = require('../services/user')
const userCode = require('./../codes/user')

module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn(ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }
    let userResult = await userService.signIn(formData)
    if (userResult) {
      result.success = true
      result.code = 200
      result.message = userCode.USER_LOGIN_SUCCESS
    } else {
      result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
      result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
    }

    if (result.success === true) {
      // 设置session
      let session = ctx.session
      session.isLogin = true
      session.userName = userResult.u_email
      session.userId = userResult.u_id
    }
    ctx.body = result
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp(ctx) {
    let formData = ctx.request.body
    let result = {
      code: 400,
      success: false,
      message: '',
      data: null
    }

    let validateResult = userService.validatorSignUp(formData)

    if (validateResult.success === false) {
      result = validateResult
      ctx.body = result
      return
    }

    let existOne = await userService.getExistOne(formData)
    if (existOne) {
      if (existOne.u_name === formData.userName) {
        result.message = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }
      if (existOne.u_email === formData.email) {
        result.message = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }

    let userResult = await userService.create({
      u_email: formData.email,
      u_password: formData.password,
      u_name: formData.userName,
      desc: formData.desc,
      u_create_date: new Date(),
    })


    if (userResult && userResult.insertId * 1 > 0) {
      result.code=200
      result.success = true
      result.message = '注册成功'
    } else {
      result.message = userCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo(ctx) {
    let session = ctx.session
    let isLogin = session.isLogin
    let userName = session.userName

    console.log('session=', session)

    let result = {
      success: false,
      message: '',
      data: null,
    }
    if (isLogin === true && userName) {
      let userInfo = await userService.getUserInfoByUserName(userName)
      if (userInfo) {
        result.data = userInfo
        result.success = true
      } else {
        result.message = userCode.FAIL_USER_NO_LOGIN
      }
    } else {
      // TODO
    }

    ctx.body = result
  },

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin(ctx) {
    let result = {
      success: false,
      message: userCode.FAIL_USER_NO_LOGIN,
      data: null,
      code: 'FAIL_USER_NO_LOGIN',
    }
    let session = ctx.session
    if (session && session.isLogin === true) {
      result.success = true
      result.message = ''
      result.code = ''
    }
    return result
  }


}
