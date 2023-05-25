/*
 * @Author: shantingting@kuaishou.com
 * @Date: 2023-03-21 19:24:03
 * @LastEditors: shantingting@kuaishou.com
 * @LastEditTime: 2023-04-27 17:09:47
 * @Description: cdn 上传功能
 */
const Upload = require("@kcdn/multi-upload");
const appConfig = require("../config.json");
const fs = require("fs");
const path = require("path");
const cdnConfig = {
  develop: {
    pid: "sogame-static-staging",
    token: "12811_ee4da8810ab7e4da5903821bd998be4d",
  },
  production: {
    pid: "sogame-static",
    token: "12766_a5c5d4c436185d5ca0fbd279874c23e7",
  },
};

function isDirectory(path) {
  const stats = fs.statSync(path);
  return stats.isDirectory();
}

function getMode() {
  const arguments = process.argv;
  let mode = "";
  arguments.forEach((val, index) => {
    if (val === "--mode") {
      mode = arguments[index + 1];
    }
  });
  return mode;
}

async function main() {
  const mode = getMode();
  const root = path.join(__dirname, "../dist/");
  const readDir = fs.readdirSync(root);
  const assets = { default: [] };
  readDir.forEach((cur) => {
    if (isDirectory(path.join(root, cur))) {
      const dirs = fs.readdirSync(path.join(root, cur));
      dirs.forEach((item) => {
        if (isDirectory(path.join(root, cur, item))) {
          throw Error("build cdnUpload 暂不支持多级嵌套");
        }
      });
      if (!assets[cur]) assets[cur] = [];
      dirs.forEach((item) => {
        assets[cur].push(path.join(root, cur, item));
      });
    } else {
      assets.default.push(path.join(root, cur));
    }
  });
  const config = cdnConfig[mode] || cdnConfig.production;
  if (appConfig.projectCode === "TODO") {
    throw Error(
      "请输入项目名称，推荐使用静态部署的服务名。！！注意不能和其他项目重名"
    );
  }
  for (const file of Object.keys(assets)) {
    const upload = new Upload({
      pid: config.pid, // [必填] 项目pid
      token: config.token, // [必填] 项目token
      cdnDir:
        file === "default"
          ? appConfig.projectCode
          : appConfig.projectCode + "/" + file, // [必填] kcdn上传路径
      files: assets[file], // [必填] 本地文件/文件夹数组
      allowRewrite: "false", // [选填] 是否开启同名更新，默认值: false
      allowHash: "false", // [选填] 是否开启文件hash，默认值: false
    });
    await upload.start();
  }
}
main();
