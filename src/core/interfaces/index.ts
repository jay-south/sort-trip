// Core interfaces - Contracts for infrastructure layer
import type { Experience, ExperienceCategory } from '../entities';

export interface ExperienceRepository {
  getAll(): Promise<Experience[]>;
  getByCategory(category: ExperienceCategory): Promise<Experience[]>;
  getById(id: string): Promise<Experience | null>;
}

export interface StorageService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}
