interface IParseVariables {
  [keys: string]: string;
}

export default interface IParseTemplateProvider {
  template: string;
  variables: IParseVariables;
}
