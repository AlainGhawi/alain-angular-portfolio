import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export class TranslateServerLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // During prerender, read the JSON straight from the built browser assets on disk
    const assetsFolder = join(process.cwd(), 'dist', 'alainportfolio', 'browser', 'assets', 'i18n');
    try {
      const content = readFileSync(join(assetsFolder, `${lang}.json`), 'utf8');
      return of(JSON.parse(content));
    } catch {
      // Fallback: try the source folder (in case assets aren't copied yet)
      try {
        const srcFolder = join(process.cwd(), 'src', 'assets', 'i18n');
        const content = readFileSync(join(srcFolder, `${lang}.json`), 'utf8');
        return of(JSON.parse(content));
      } catch {
        return of({});
      }
    }
  }
}