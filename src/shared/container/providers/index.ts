import { container } from 'tsyringe';

import IStorageProvider from './DiskStorageProvider/models/IStorageProvider';
import DiskStorageProvider from './DiskStorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
