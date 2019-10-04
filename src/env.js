/**
 * env.yaml を環境変数から生成する
 * 不足している値があればエラーを出す
 */

// 必須なキーをここに指定
const requiredKeys = [
]

// 依存関係増やしたくなかったのでとりあえず一段の object に耐えうる YAML 変換実装を用意したもの
function toYAMLValueRepresent(v) {
  if (typeof v === 'number') return v.toString()
  if (typeof v === 'string') return `"${v}"`
  console.error('ダメな値です……')
  return 'null'
}
function toYAML (o, d = 0) {
  return Object.keys(o).map(k => `${' '.repeat(d)}${k}: ${typeof o[k] === 'object' ? '\n' + toYAML(o[k], d + 2) : toYAMLValueRepresent(o[k])}`).join('\n')
}

// env.yaml の構造に変換する
const env = {
  env_variables: requiredKeys.map(k => [k, process.env[k]]).reduce((o, [k, v]) => { o[k] = v; return o }, {}),
}

// validate する
const unknown = Object.entries(env.env_variables).filter(([, v]) => typeof v === 'undefined')
if (unknown.length) {
  unknown.forEach(([k]) => console.error(`Environment variable '${k}' is missing.`))
  process.exit(1)
}

require('fs').writeFileSync(require('path').join(__dirname, '..', 'env.yaml'), toYAML(env))
