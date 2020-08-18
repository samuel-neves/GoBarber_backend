import IParseTemplateProvider from '../dtos/IParseMailTemplateProvider';

export default interface IMailTemplateProvider {
  parse(data: IParseTemplateProvider): Promise<string>;
}
