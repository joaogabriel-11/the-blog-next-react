'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { put } from '@vercel/blob';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  const uploadMaxSize =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

  if (file.size > uploadMaxSize) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const safeFileName = file.name.replaceAll(/[^a-zA-Z0-9._-]/g, '-');
  const pathname = `uploads/${Date.now()}-${safeFileName}`;

  try {
    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return makeResult({ url: blob.url });
  } catch {
    return makeResult({
      error:
        'Erro ao enviar imagem. Verifique se o Vercel Blob esta configurado.',
    });
  }
}
