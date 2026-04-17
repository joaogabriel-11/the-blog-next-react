import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const minhaSenha = '';
  const hashDaSeha = await hashPassword(minhaSenha);

  console.log({ hashDaSeha });
})();
