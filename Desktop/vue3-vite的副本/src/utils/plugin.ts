/*
 * @Author: shantingting@kuaishou.com
 * @Date: 2023-04-17 15:47:36
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-10 16:29:34
 * @Description:  项目插件配置，weblogger， radar 和 ps
 */

import { Weblog } from '@ks/weblogger';
import Radar from '@ks-radar/radar/vue-spa';
import { getAppEnv } from './env';
import config from '../../config.json';
import { router } from '@/router';

import Ps from '@ks/ps-sdk';

export function steupKsgLogger () {
  const env = ['prod'].includes(getAppEnv()) ? 'production': 'logger';
  // 初始化 weblogger
  if (!config.loggerId) return;
  const weblogger = new Weblog(
    {
      env, // 正式环境
      sampling: 1,
      lcp: true,
      cls: true,
      fid: true,
      fcp: true
    },
    {
      product_name: config.loggerId, // 在埋点管理平台注册的产品
      product: 1  // 若只在端内桥接上报无需填写，若同时需在端外打开且v2上报则需要填写
      
    }
  );
  // 配置了radarId才会启用
  config.radarId && new Radar({
    weblog: weblogger,
    projectId: config.radarId,
    sampling:1,
    router, // 【选填】vue 的router实例，如果无法传入也可选择使用routeChange的方案使用
    enableReportRpv: true, // 【选填】自动上报SPA应用的PV
    APIHook (apiData) {
      const { response } = apiData;
      const data = JSON.parse(response.data);
      return {
        response_code: data.code, //【选填】 业务定义的接口返回的code，number类型
        response_msg: data.msg, //【选填】 业务定义的接口返回code的解释，string类型，限制100字符以内
        // custom_failed: data.code !== 0, //【选填】 业务定义的api是否失败，api成功率依靠这个指标来进行判断。默认值为!(status >= 200 && status < 300)，boolean类型,平台显示的api成功率依赖该字段
        intercept_report: false //【选填】是否拦截上报该条日志，true为拦截，默认值为false
      };
    }
  })
}

export function initPsSdk (userName: string) {
  config.psId && Ps.init({
    kpn: config.psId,
    userName, // 当前用户的userName
    Weblog: Weblog // Weblog类，为了统计数据，请务必传入
  }).usePluginConfig('notice', {});
}