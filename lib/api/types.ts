export interface FilecloudFile {
  file: string;
  type: string;
  description?: string;
}

export interface FilecloudPayload {
  title: string;
  description?: string;
  files: FilecloudFile[];
}

export interface FilecloudResponse {
  data?: FilecloudPayload;
  status?: string;
  status_code?: number;
  message?: string;
  request_id?: string;
}
