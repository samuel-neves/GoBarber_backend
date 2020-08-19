import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
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

  it('should not be able to authenticate with a wrong credencials', async () => {
    const createdUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(createdUser).toHaveProperty('id');

    await expect(
      authenticateUser.execute({
        email: 'wrongEmail@gmail.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authenticateUser.execute({
        email: 'johndoe@gmail.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authenticateUser.execute({
        email: 'wrongEmail@gmail.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'non_existing_user@gmail.com',
        password: 'non_existing_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
