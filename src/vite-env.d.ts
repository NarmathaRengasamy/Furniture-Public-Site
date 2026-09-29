/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PERFOX_WIDGET_URL: string;
  readonly VITE_PERFOX_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
