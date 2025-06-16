declare module "jsonbin-orm" {
  interface BinConfig {
    binId: string;
    apiKey: string;
    schema: Object;
  }

  class bin {
    constructor(config: BinConfig);
    createNew(data: any): Promise<any>;
    fetchById(id: string): Promise<any>;
    updateOneById(id: string, data: any): Promise<any>;
    deleteById(id: string): Promise<boolean>;
    find(query: Object): Promise<any[]>;
    updateMany(query: Object, data: any): Promise<any[]>;
  }

  export { bin, BinConfig };
}
