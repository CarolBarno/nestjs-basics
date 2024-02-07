import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  bookmarkDto,
  createBookmarkDto,
  updatebookmarkDto,
} from '../../test/utils/test-objects';
import { ForbiddenException } from '@nestjs/common';

describe('BookmarkService', () => {
  let bookmarkService: BookmarkService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarkService,
        {
          provide: PrismaService,
          useValue: {
            bookmark: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    bookmarkService = module.get<BookmarkService>(BookmarkService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
    expect(bookmarkService).toBeDefined();
  });

  describe('getBookmarks', () => {
    it('should return bookmarks for a user', async () => {
      const userId = 1;

      jest
        .spyOn(prismaService.bookmark, 'findMany')
        .mockResolvedValue([bookmarkDto]);

      const result = await bookmarkService.getBookmarks(userId);

      expect(result).toEqual([bookmarkDto]);
    });
  });

  describe('getBookmarkById', () => {
    it('should return a bookmark by ID for a user', async () => {
      const userId = 1;
      const bookmarkId = 1;

      jest
        .spyOn(prismaService.bookmark, 'findFirst')
        .mockResolvedValue(bookmarkDto);

      const result = await bookmarkService.getBookmarkById(userId, bookmarkId);

      expect(result).toEqual(bookmarkDto);
    });
  });

  describe('createBookmark', () => {
    it('should create a bookmark for a user', async () => {
      const userId = 1;

      jest
        .spyOn(prismaService.bookmark, 'create')
        .mockResolvedValue(bookmarkDto);

      const result = await bookmarkService.createBookmark(
        userId,
        createBookmarkDto,
      );

      expect(result).toEqual(bookmarkDto);
    });
  });

  describe('editBookmarkById', () => {
    it('should edit a bookmark by ID for a user', async () => {
      const userId = 1;
      const bookmarkId = 1;

      jest
        .spyOn(prismaService.bookmark, 'findUnique')
        .mockResolvedValue(bookmarkDto);
      jest
        .spyOn(prismaService.bookmark, 'update')
        .mockResolvedValue(bookmarkDto);

      const result = await bookmarkService.editBookmarkById(
        userId,
        bookmarkId,
        updatebookmarkDto,
      );

      expect(result).toEqual(bookmarkDto);
    });

    it('should throw ForbiddenException when trying to edit a bookmark with wrong user', async () => {
      const userId = 2;
      const bookmarkId = 1;

      jest
        .spyOn(prismaService.bookmark, 'findUnique')
        .mockResolvedValue(bookmarkDto);

      await expect(
        bookmarkService.editBookmarkById(userId, bookmarkId, updatebookmarkDto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('deleteBookmarkById', () => {
    it('should delete a bookmark by ID for a user', async () => {
      const userId = 1;
      const bookmarkId = 1;

      jest
        .spyOn(prismaService.bookmark, 'findUnique')
        .mockResolvedValue(bookmarkDto);
      jest
        .spyOn(prismaService.bookmark, 'delete')
        .mockResolvedValue(bookmarkDto);

      const result = await bookmarkService.deleteBookmarkById(
        userId,
        bookmarkId,
      );

      expect(result).toBeUndefined();
    });

    it('should throw ForbiddenException when trying to delete a bookmark with wrong user', async () => {
      const userId = 2;
      const bookmarkId = 1;

      jest
        .spyOn(prismaService.bookmark, 'findUnique')
        .mockResolvedValue(bookmarkDto);

      await expect(
        bookmarkService.deleteBookmarkById(userId, bookmarkId),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
