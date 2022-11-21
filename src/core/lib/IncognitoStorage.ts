/**
 * Implements an in-memory storage, using a singleton.
 */
class IncognitoStorage implements Storage {
  /**
   * Holds the singleton instance.
   */
  protected static INSTANCE: IncognitoStorage;

  /**
   * Holds all the keys in the storage.
   */
  protected keys: Array<string> = [];

  /**
   * Map holding the storage data.
   */
  protected storage: Map<string, any> = new Map();

  /**
   * Storage constructor.
   *
   * @returns
   */
  constructor() {
    if (IncognitoStorage.INSTANCE) return IncognitoStorage.INSTANCE;
    IncognitoStorage.INSTANCE = this;
  }

  get length(): number {
    return this.storage.size;
  }

  key(index: number): string {
    return this.keys[index];
  }

  getItem(key: string): any {
    return this.storage.get(key);
  }

  setItem(key: string, value: any): void {
    this.storage.set(key, JSON.stringify(value));
    this.updateKeys();
  }

  removeItem(key: string): void {
    this.storage.delete(key);
    this.updateKeys();
  }

  clear() {
    this.storage.clear();
    this.keys = [];
  }

  /**
   * Updates the keys array internally.
   */
  private updateKeys() {
    this.keys = Array.from(this.storage.keys());
  }
}

export default new IncognitoStorage();
