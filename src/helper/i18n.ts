interface Locals {
  [key: string]: string
}

interface Vars {
  [key: string]: string
}

interface I18n {
  locals: Locals
  t(key: string, vars?: Vars): string
}

class I18n {
  public locals
  public constructor(locals: Locals) {
    this.locals = locals
  }
  public t(key: string, vars?: Vars): string {
    let text = this.locals[key]
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(new RegExp('{{' + k + '}}', 'g'), v)
      })
    }
    return text
  }
}

export default I18n
