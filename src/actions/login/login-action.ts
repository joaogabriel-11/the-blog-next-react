'use server';

import { verifyPassword } from '@/lib/login/manage-login';
import { asyncDelay } from '@/utils/async-delay';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  asyncDelay(5000);

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados Invalidos',
    };
  }

  // Pegar os dados do form
  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username,
      error: 'Digite o usuario e a senha',
    };
  }

  // Checar se o usuario é valido
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      error: 'Usuario ou senha invalidos',
    };
  }

  // TODO : abaixo
  // Usuario e senha validos
  // Criar o cookie e redirecionar a pagina
  return {
    username: '',
    error: 'USUARIO LOGADO COM SUCESSO',
  };
}
