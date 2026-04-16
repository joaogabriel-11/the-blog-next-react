import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const minhaSenha = 'senha';
  const hashDaSeha = await hashPassword(minhaSenha);

  console.log({ hashDaSeha });
})();
