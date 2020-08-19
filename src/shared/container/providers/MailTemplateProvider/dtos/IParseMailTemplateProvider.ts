interface IParseVariables {
  [keys: string]: string;
}

export default interface IParseTemplateProvider {
  file: string;
  variables: IParseVariables;
}
