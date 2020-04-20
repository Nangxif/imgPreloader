const program = require('commander');
program
  .version('0.0.1')
  .option('-i, --images [images]', 'images file path')
  .option('-j, --js [js]', 'js file path')
  .option('-d, --dir [dir]', 'dir path')
  .parse(process.argv);
module.exports = program;
