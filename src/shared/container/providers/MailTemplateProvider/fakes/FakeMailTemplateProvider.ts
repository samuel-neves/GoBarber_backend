import IMailTemplateProvider from '../models/IMailTemplateProvider';

import IParseMailTemplateProvider from '../dtos/IParseMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
  }: IParseMailTemplateProvider): Promise<string> {
    return template;
  }
}
