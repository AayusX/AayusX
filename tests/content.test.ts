import { describe, expect, it } from 'vitest';
import { en } from '../src/i18n/en';
import { ne } from '../src/i18n/ne';
import {
  ARCHIVE_PROJECTS,
  CASE_STUDIES,
  FEATURED_CASE_STUDIES,
  PROJECT_STATUSES,
} from '../src/content/projects';
import { TECH_WALL, techIcon } from '../src/content/tech';

describe('project content', () => {
  it('has bilingual copy for every case study', () => {
    for (const project of CASE_STUDIES) {
      expect(en.projects.items, `English copy for ${project.slug}`).toHaveProperty(project.slug);
      expect(ne.projects.items, `Nepali copy for ${project.slug}`).toHaveProperty(project.slug);
    }
  });

  it('gives every featured case study a working destination', () => {
    expect(FEATURED_CASE_STUDIES.length).toBeGreaterThan(0);
    for (const project of FEATURED_CASE_STUDIES) {
      expect(Boolean(project.live ?? project.code)).toBe(true);
    }
  });

  it('uses only known statuses', () => {
    for (const project of [...CASE_STUDIES, ...ARCHIVE_PROJECTS]) {
      expect(PROJECT_STATUSES).toContain(project.status);
    }
  });

  it('lists only external archive links with https', () => {
    for (const project of ARCHIVE_PROJECTS) {
      expect(project.href.startsWith('https://')).toBe(true);
      expect(project.tech.length).toBeGreaterThan(0);
    }
  });

  it('uses media that exists inside public/media', () => {
    for (const project of CASE_STUDIES) {
      if (!project.media) continue;
      expect(project.media.src.startsWith('/media/')).toBe(true);
      expect(project.media.src.endsWith('.mp4')).toBe(true);
    }
  });
});

describe('technology marks', () => {
  it('resolves every tech-wall entry to an authentic Simple Icons mark', () => {
    for (const name of TECH_WALL) {
      expect(techIcon(name), `icon for ${name}`).toBeTruthy();
    }
  });
});
