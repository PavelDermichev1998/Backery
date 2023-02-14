import React, { useRef, useState } from 'react';
import DOWNLOAD_CONST from './useDownloadHook.dictionary';

interface DownloadFileProps {
  readonly apiDefinition: CallableFunction;
}

interface DownloadedFileInfo {
  readonly prepareLink: () => Promise<void>;
  readonly ref: React.MutableRefObject<HTMLAnchorElement | null>;
  readonly name: string | undefined;
  readonly url: string | undefined;
}

export function useExportingFile({
  apiDefinition,
}: DownloadFileProps): DownloadedFileInfo {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [url, setFileUrl] = useState<string>();
  const [name, setFileName] = useState<string>();
  const getFileName = () => `${DOWNLOAD_CONST.FILE_NAME}`;

  const prepareLink = async () => {
    try {
      const response = await apiDefinition();
      const urlFile = URL.createObjectURL(new Blob([response.payload]));
      setFileUrl(urlFile);
      setFileName(getFileName());
    } catch (error) {
      setFileName(getFileName());
    }
  };

  return {
    prepareLink,
    ref,
    url,
    name,
  };
}
