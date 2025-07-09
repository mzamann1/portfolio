/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATA_PATH?: string;
  // add more custom env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

