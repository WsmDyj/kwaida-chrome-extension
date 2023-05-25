/*
 * @Author: shantingting@kuaishou.com
 * @Date: 2023-04-17 16:46:28
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-04-24 13:54:33
 * @Description: 介绍文件的作用、文件的入参、出参
 */
export enum ENVENUM {
    staging= 'staging',
    prt='prt',
    prod='prod',
    sgp='sgp',
    sgpPrt='sgpPrt'
  }
  
const envMap = {
  staging: ENVENUM.staging ,
  prt: ENVENUM.prt,
  prod: ENVENUM.prod,
  sgp: ENVENUM.sgp,
  sgpPrt: ENVENUM.sgpPrt
}
  
export function getAppEnv () {
  const hostname = window.location.hostname;
  // 常见域名后缀映射
  let env :(keyof typeof envMap);
  if (hostname === 'test.corp.kuaishou.com' || hostname.endsWith('.staging.kuaishou.com')) {
    env = envMap.staging;
    // 静态部署
  } else if (hostname.endsWith('proxy.corp.kuaishou.com')) {
    env = envMap.staging;
  }  else if (hostname.endsWith('.test.gifshow.com') ){
    env = ['-oversea', '-sgp'].some((it) => hostname.includes(it)) ? envMap.sgpPrt :  envMap.prt;
  } else if (hostname.endsWith('.corp.kuaishou.com')){
    env = ['-oversea', '-sgp'].some((it) => hostname.includes(it)) ? envMap.sgp :  envMap.prod;
  } else {
    env = envMap.prod;
  }	
  return env;
}

export function getApiHost () {
  const env = getAppEnv();
  // 网关环境对应的地址
  const envHostMap = {
    [envMap.staging]: 'https://sogame-kagura-gateway.staging.kuaishou.com',
    [envMap.prt]: 'https://sogame-kagura-gateway.test.gifshow.com',
    [envMap.prod]: 'https://sogame-kagura-gateway.corp.kuaishou.com',
    [envMap.sgp]: 'https://sogame-kagura-gateway-oversea.corp.kuaishou.com',
    [envMap.sgpPrt]: 'https://sogame-kagura-gateway-oversea.test.gifshow.com'
  }	
  return envHostMap[env] || envHostMap.prod;
}
