const fs = require('fs');
const ora = require('ora');
const shell = require('shelljs');
const chalk = require('chalk');
const path = require('path');
const resolve = path.join;
const {
  filename, //文件名称
  output, //输出的文件夹地址
  entry, //图片文件夹地址
  judge //判断条件
} = require('./config');
// console.log(judge);
// 遍历图片文件夹
/*
遍历文件夹生成对象或者数组需要考虑几点
1.根文件夹和子文件夹可能重名
2.文件夹命名可能存在跟图片名称（包括后缀）一样的情况
*/
function filterSprit(str) {
  return /^\//.test(str) ? str : '/' + str;
}
const mapDir = (baseDir, parent = '') => {
  const files = fs.readdirSync(resolve(__dirname, baseDir));
  let mapDirRes = [];
  files.forEach(item => {
    if (fs.statSync(resolve(__dirname, baseDir, item)).isDirectory()) {
      mapDirRes.push({
        dir: filterSprit(`${parent}/${item}`),
        children: mapDir(`${baseDir}/${item}`, filterSprit(`${parent}/${item}`))
      });
    } else {
      // 生成相对位置
      mapDirRes.push(
        `require('${path
          .relative(
            resolve(__dirname, output),
            resolve(__dirname, baseDir, item)
          )
          .replace(/\\/g, '/')}')`
      );
    }
  });
  return mapDirRes;
};

// 遍历图片文件夹生成对象
const imageMap = mapDir(entry);
// console.log(imageMap);
// fs.appendFileSync(
//   resolve(__dirname, 'info.js'),
//   `${JSON.stringify(imageMap)}\n`
// );
// 书写函数
const writeJs = content => {
  fs.appendFileSync(resolve(__dirname, output, filename), `${content}\n`);
};
// 一边遍历一边书写
const spinner = ora('正在生成图片预加载文件...');
const makeJs = imageMap => {
  spinner.start();
  // 先删除文件
  if (fs.existsSync(resolve(__dirname, output, filename))) {
    console.log(chalk.green('\n查找到已生成的数组文件，进行删除操作'));
    shell.rm('-r', resolve(__dirname, output, filename));
  } else {
    console.log(chalk.green('\n查找不到已生成的数组文件，跳过删除操作'));
  }
  //   如果文件夹不存在，那么先新增
  if (!fs.existsSync(resolve(__dirname, output))) {
    try {
      fs.mkdirSync(resolve(__dirname, output));
    } catch (err) {
      console.error(err);
    }
  }
  writeJs('let preLoadImg=[];');
  function mapJS(imageMap, parentKey = '') {
    if (imageMap.filter(item => typeof item == 'string').length > 0) {
      writeJs(`//${parentKey}文件夹`);
      writeJs(
        `preLoadImg.push(${imageMap.filter(item => typeof item == 'string')});`
      );
    }
    imageMap
      .filter(item => typeof item !== 'string')
      .forEach(e => {
        // writeJs(`//${e.dir}文件夹`);
        if (judge[e.dir]) {
          // 有判断条件
          if (typeof judge[e.dir] == 'string') {
            // 判断条件不是对象
            // 判断条件是对象，如果exclude为self的话这个文件夹直接就不要了
            if (judge[e.dir].exclude != 'self') {
              // writeJs(`//${e.dir}文件夹`);
              writeJs(`if(${judge[e.dir]}){`);
              mapJS(e.children, e.dir);
              writeJs(`}`);
            }
          } else {
            if (judge[e.dir].fileJudge) {
              // 有判断条件的话
              // writeJs(`//${e.dir}文件夹`);
              writeJs(`if(${judge[e.dir].fileJudge}){`);
              if (judge[e.dir].exclude) {
                judge[e.dir].exclude.forEach(i => {
                  e.children
                    .filter(item => typeof item != 'string')
                    .forEach(items => {
                      if (i != `/${items.dir}`) {
                        mapJS(e.children, e.dir);
                      }
                    });
                });
                mapJS(
                  e.children.filter(item => typeof item == 'string'),
                  e.dir
                );
              } else {
                mapJS(e.children, e.dir);
              }
              writeJs(`}`);
            } else {
              // writeJs(`//${e.dir}文件夹`);
              if (judge[e.dir].exclude) {
                const filteStrrArr = e.children.filter(
                  item => typeof item != 'string'
                );
                const filterExcludeArr = filteStrrArr.filter(item => {
                  return !judge[e.dir].exclude.find(i => i == item.dir);
                });
                filterExcludeArr.forEach(item => {
                  mapJS(item.children, item.dir);
                });
                mapJS(
                  e.children.filter(item => typeof item == 'string'),
                  e.dir
                );
              } else {
                mapJS(e.children, e.dir);
              }
            }
          }
        } else {
          // writeJs(`//${e.dir}文件夹`);
          mapJS(e.children, e.dir);
        }
      });
  }
  mapJS(imageMap);
  writeJs('export default preLoadImg;');
  // 后续操作
  // 格式校验一下生成的图片数组文件
  shell.exec(`npm run lint --fix ${resolve(__dirname, output, filename)}`);
  spinner.stop();
  console.log(chalk.green('已格式校验数组文件'));
  console.log(
    chalk.green(`已在${resolve(output, filename)}生成预加载图片数组文件`)
  );
};

makeJs(imageMap);
