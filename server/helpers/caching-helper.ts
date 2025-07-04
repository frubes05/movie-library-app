import { cache } from "../cache";
import { Response } from "express";

export class CachingHelper {
  private static readonly instances: Map<string, CachingHelper> = new Map();

  private constructor(private readonly key: string) {}

  public static getInstance(key: string): CachingHelper {
    if (!this.instances.has(key)) {
      this.instances.set(key, new CachingHelper(key));
    }
    return this.instances.get(key)!;
  }

  public getFromCache<T>(): T | undefined {
    return cache.get<T>(this.key);
  }

  public setToCache<T>(data: T, ttl?: number): void {
    if (ttl !== undefined) {
      cache.set(this.key, data, ttl);
    } else {
      cache.set(this.key, data);
    }
  }

  public respondWithCache<T>(res: Response, maxAge: number = 3600): boolean {
    const cached = this.getFromCache<T>();
    if (cached) {
      res.set("Cache-Control", `public, max-age=${maxAge}`);
      res.status(200).json(cached);
      return true;
    }
    return false;
  }
}
