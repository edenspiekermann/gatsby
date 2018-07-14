/* @flow */
const parser = require(`@babel/parser`)

const PARSER_OPTIONS = {
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  allowSuperOutsideMethod: true,
  sourceType: `unambigious`,
  sourceFilename: true,
  plugins: [
    `jsx`,
    `flow`,
    `doExpressions`,
    `objectRestSpread`,
    `decorators`,
    `classProperties`,
    `classPrivateProperties`,
    `classPrivateMethods`,
    `exportDefaultFrom`,
    `exportNamespaceFrom`,
    `asyncGenerators`,
    `functionBind`,
    `functionSent`,
    `dynamicImport`,
    `numericSeparator`,
    `optionalChaining`,
    `importMeta`,
    `bigInt`,
    `optionalCatchBinding`,
    `throwExpressions`,
    `pipelineOperator`,
    `nullishCoalescingOperator`,
  ],
}

export function getBabelParserOptions(filePath) {
  // Flow and typescript plugins can't be enabled simultaneously
  if (/\.tsx?/.test(filePath)) {
    const { plugins } = PARSER_OPTIONS
    return {
      ...PARSER_OPTIONS,
      plugins: plugins.map(
        plugin => (plugin === `flow` ? `typescript` : plugin)
      ),
    }
  }
  return PARSER_OPTIONS
}

export function babelParseToAst(contents, filePath) {
  return parser.parse(contents, getBabelParserOptions(filePath))
}
