import handlebars from 'handlebars';

import IMailTemplateProvider from '../models/IMailTemplateProvider';

import IParseMailTemplateProvider from '../dtos/IParseMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateProvider): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
