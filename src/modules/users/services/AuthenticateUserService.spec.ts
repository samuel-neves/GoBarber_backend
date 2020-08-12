import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able authenticate the specific user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createdUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(createdUser).toHaveProperty('id');

    const user = await authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
    expect(user.user).toEqual(createdUser);
  });

  it('should not be able authenticate with a wrong credencials', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createdUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(createdUser).toHaveProperty('id');

    expect(
      authenticateUser.execute({
        email: 'johndoe1@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      authenticateUser.execute({
        email: 'johndoe@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      authenticateUser.execute({
        email: 'johndoe1@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
