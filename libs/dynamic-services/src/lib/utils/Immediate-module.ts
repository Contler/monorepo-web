import { ImmediateRequestModule, OptionModule } from '@contler/models';

export class ImmediateModule {
  private data: ImmediateRequestModule;

  constructor() {
    this.data = { categories: {} };
  }

  addCategory(id: string, name: string) {
    this.data.categories[id] = { id, name, options: [] };
    return this;
  }

  addOption(categoryId: string, option: OptionModule) {
    this.data.categories[categoryId]?.options.push(option);
    return this;
  }

  get module() {
    return this.data;
  }
}
