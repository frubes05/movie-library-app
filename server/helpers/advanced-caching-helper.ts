import { cache } from "../cache";
import { Response } from "express";

export interface CacheConfig {
  ttl?: number;
  maxAge?: number;
  staleWhileRevalidate?: boolean;
  tags?: string[];
}

export interface CacheMetadata {
  timestamp: number;
  ttl: number;
  tags: string[];
  hitCount: number;
  lastAccessed: number;
}

export interface CachedData<T = any> {
  data: T;
  metadata: CacheMetadata;
}

export class AdvancedCachingHelper {
  private static readonly instances: Map<string, AdvancedCachingHelper> = new Map();
  private static readonly tagIndex: Map<string, Set<string>> = new Map();
  
  private constructor(private readonly key: string) {}

  public static getInstance(key: string): AdvancedCachingHelper {
    if (!this.instances.has(key)) {
      this.instances.set(key, new AdvancedCachingHelper(key));
    }
    return this.instances.get(key)!;
  }

  public getFromCache<T>(): T | undefined {
    const cached = cache.get<CachedData<T>>(this.key);
    if (!cached) return undefined;

    // Update access metadata
    cached.metadata.hitCount++;
    cached.metadata.lastAccessed = Date.now();
    cache.set(this.key, cached, cached.metadata.ttl);

    return cached.data;
  }

  public setToCache<T>(
    data: T, 
    config: CacheConfig = {}
  ): void {
    const {
      ttl = 3600,
      tags = [],
      staleWhileRevalidate = false
    } = config;

    const metadata: CacheMetadata = {
      timestamp: Date.now(),
      ttl,
      tags,
      hitCount: 0,
      lastAccessed: Date.now()
    };

    const cachedData: CachedData<T> = {
      data,
      metadata
    };

    // Set cache with TTL
    cache.set(this.key, cachedData, ttl);

    // Update tag index for cache invalidation
    tags.forEach(tag => {
      if (!AdvancedCachingHelper.tagIndex.has(tag)) {
        AdvancedCachingHelper.tagIndex.set(tag, new Set());
      }
      AdvancedCachingHelper.tagIndex.get(tag)!.add(this.key);
    });

    // Set stale-while-revalidate if enabled
    if (staleWhileRevalidate) {
      const staleKey = `${this.key}:stale`;
      cache.set(staleKey, cachedData, ttl * 2); // Keep stale data longer
    }
  }

  public respondWithCache<T>(
    res: Response, 
    config: CacheConfig = {}
  ): boolean {
    const { maxAge = 3600, staleWhileRevalidate = false } = config;
    
    const cached = this.getFromCache<T>();
    
    if (cached) {
      const headers: Record<string, string> = {
        'Cache-Control': `public, max-age=${maxAge}`,
        'X-Cache': 'HIT'
      };

      if (staleWhileRevalidate) {
        headers['Cache-Control'] += `, stale-while-revalidate=${maxAge * 2}`;
      }

      res.set(headers);
      res.status(200).json(cached);
      return true;
    }

    // Check for stale data if stale-while-revalidate is enabled
    if (staleWhileRevalidate) {
      const staleData = cache.get<CachedData<T>>(`${this.key}:stale`);
      if (staleData) {
        res.set({
          'Cache-Control': `public, max-age=0, stale-while-revalidate=${maxAge}`,
          'X-Cache': 'STALE'
        });
        res.status(200).json(staleData.data);
        return true;
      }
    }

    res.set('X-Cache', 'MISS');
    return false;
  }

  public invalidateCache(): void {
    cache.del(this.key);
    cache.del(`${this.key}:stale`);
  }

  public static invalidateByTag(tag: string): number {
    const keys = this.tagIndex.get(tag);
    if (!keys) return 0;

    let invalidatedCount = 0;
    keys.forEach(key => {
      cache.del(key);
      cache.del(`${key}:stale`);
      invalidatedCount++;
    });

    this.tagIndex.delete(tag);
    return invalidatedCount;
  }

  public static getCacheStats(): {
    totalKeys: number;
    totalTags: number;
    memoryUsage: string;
  } {
    const stats = cache.getStats();
    return {
      totalKeys: stats.keys,
      totalTags: this.tagIndex.size,
      memoryUsage: `${Math.round(stats.vsize / 1024 / 1024 * 100) / 100} MB`
    };
  }

  public getCacheInfo(): CacheMetadata | null {
    const cached = cache.get<CachedData>(this.key);
    return cached?.metadata || null;
  }

  public isStale(maxAge: number = 3600): boolean {
    const info = this.getCacheInfo();
    if (!info) return true;
    
    const age = (Date.now() - info.timestamp) / 1000;
    return age > maxAge;
  }
}