declare module "jsonbin-orm" {
    interface BinConfig {
      binId: string;
      apiKey: string;
      schema: Record<string, string>;
    }
  
    interface RecordData {
      [key: string]: any;
    }
  
    class Bin {
      constructor(config: BinConfig);
      createNew(data: RecordData): Promise<RecordData>;
      fetchById(id: string): Promise<RecordData>;
      updateOneById(id: string, data: RecordData): Promise<RecordData>;
      deleteById(id: string): Promise<boolean>;
    }
  
    export { Bin, BinConfig, RecordData };}