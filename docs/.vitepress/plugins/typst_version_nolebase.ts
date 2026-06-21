import type { Plugin } from 'vite';

import { TYPST_TAGS_FOR_NOLEBASE } from '../theme/typst_version';

export function TypstTagsForNolebase(): Plugin {
  const name = 'zhtyp-guide-typst-version';
  const virtualModuleId = `virtual:${name}`;
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  return {
    name,
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id: string) {
      if (id !== resolvedVirtualModuleId) {
        return;
      }

      return `export default ${JSON.stringify(TYPST_TAGS_FOR_NOLEBASE)};`;
    },
  };
}
