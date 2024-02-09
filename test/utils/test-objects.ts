import { CreateBookmarkDto, UpdateBookmarkDto } from '../../src/bookmark/dto';
import { AuthDto } from '../../src/auth/dto';
import { EditUserDto } from 'src/user/dto';

export const authDto: AuthDto = {
  email: 'test@example.com',
  password: 'password123',
};

export const authResponse = {
  access_token: 'mockAccessToken',
};

export const bookmarkDto = {
  id: 1,
  title: 'Test',
  description: 'Test',
  link: 'https://google.com/',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
};

export const createBookmarkDto: CreateBookmarkDto = {
  title: 'Test',
  link: 'https://google.com/',
};

export const updatebookmarkDto: UpdateBookmarkDto = {
  description: 'Testing',
  title: 'Test 1',
};

export const editUserDto: EditUserDto = {
  firstName: 'Jane',
  email: 'johndoe@gmail.com',
};

export const user = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'janedoe@gmail.com',
  hash: 'qwertyuio',
  firstName: 'Jane',
  lastName: 'Doe',
};

export const healthResponse = {
  status: 'ok',
  info: {},
  error: {},
  details: {},
};

export const mailerMock = {
  sendMail: jest.fn().mockResolvedValue({}),
};
