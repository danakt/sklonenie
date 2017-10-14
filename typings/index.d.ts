// Типы родов
type Male = 1
type Female = 2
type GenderTypes = Male | Female

// Список склонений
interface DeclensionList extends Array<string> {
  readonly 'именительный': string
  readonly 'родительный': string
  readonly 'дательный': string
  readonly 'винительный': string
  readonly 'творительный': string
  readonly 'предложный': string
}

// Результат склонения
type DeclensionResult = [string, string, string]
interface SklonenieResult extends Array<DeclensionResult> {
  readonly firstname: DeclensionList
  readonly middlename: DeclensionList
  readonly lastname: DeclensionList
  readonly 'именительный': DeclensionResult
  readonly 'родительный': DeclensionResult
  readonly 'дательный': DeclensionResult
  readonly 'винительный': DeclensionResult
  readonly 'творительный': DeclensionResult
  readonly 'предложный': DeclensionResult
}

// Интерфейс основного функционала
interface Sklonenie {
  (firstName: string, middleName: string, lastName: string, gender?: GenderTypes): SklonenieResult
  firstname(firstName: string, gende?: GenderTypes): DeclensionList
  middlename(middleName: string, gende?: GenderTypes): DeclensionList
  lastname(lastname: string, gende?: GenderTypes): DeclensionList
}

// Экспорт
declare const sklonenie: Sklonenie
declare module 'sklonenie' {
  export = sklonenie
}
