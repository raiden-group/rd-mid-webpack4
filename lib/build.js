const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printBuildError = require('react-dev-utils/printBuildError');
const { printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');

const WARN_AFTER_BUNDLE_GZIP_SIZE = 1024 * 1024; // m1
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024 * 1024; // 1M

module.exports = async function (ctx, webpackConfig, opts) {
  const log = ctx.log;
  console.time('Time:')
  const spainer = log.ora("开始构建...");
  function successHandler({ stats, warnings }) {
    // if (warnings.length) {
      // log.warn('构建过程存在警告：');
      // log.warn(warnings.join('\n\n'));
    // } else {
    spainer.succeed('构建完成');
    // }
    console.timeEnd('Time:')
    log.info('压缩后文件大小:');
    printFileSizesAfterBuild(
      stats,
      {
        root: webpackConfig.output.path,
        sizes: {},
      },
      webpackConfig.output.path,
      WARN_AFTER_BUNDLE_GZIP_SIZE,
      WARN_AFTER_CHUNK_GZIP_SIZE,
    );
  }

  function errorHandler(err) {
    log.error('构建失败，请查看：');
    printBuildError(err);
    process.exit(1);
  }

  function doneHandler(err, stats) {
    if (err) {
      return errorHandler(err);
    }
    const messages = formatWebpackMessages(stats.toJson({}, true));
    if (messages.errors.length) {
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      return errorHandler(new Error(messages.errors.join('\n\n')));
    }

    return successHandler({
      stats,
      warnings: messages.warnings,
    });
  }
  const compiler = webpack(webpackConfig);
  compiler.run(doneHandler)
}