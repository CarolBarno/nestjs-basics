import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import {
  bookmarkDto,
  createBookmarkDto,
  updatebookmarkDto,
} from '../../test/utils/test-objects';
import { PrismaService } from '../prisma/prisma.service';

describe('BookmarkController', () => {
  let controller: BookmarkController;
  let bookmarkService: BookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [BookmarkService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<BookmarkController>(BookmarkController);
    bookmarkService = module.get<BookmarkService>(BookmarkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(bookmarkService).toBeDefined();
  });

  describe('getBookmarks', () => {
    it('should return bookmarks for a user', async () => {
      const userId = 1;

      jest
        .spyOn(bookmarkService, 'getBookmarks')
        .mockResolvedValue([bookmarkDto]);

      const result = await controller.getBookmarks(userId);

      expect(result).toEqual([bookmarkDto]);
      expect(bookmarkService.getBookmarks).toHaveBeenCalledWith(userId);
    });
  });

  describe('getBookmarkById', () => {
    it('should return a bookmark by ID for a user', async () => {
      const userId = 1;
      const bookmarkId = 1;

      jest
        .spyOn(bookmarkService, 'getBookmarkById')
        .mockResolvedValue(bookmarkDto);

      const result = await controller.getBookmarkById(userId, bookmarkId);

      expect(result).toEqual(bookmarkDto);
      expect(bookmarkService.getBookmarkById).toHaveBeenCalledWith(
        userId,
        bookmarkId,
      );
    });
  });

  describe('createBookmark', () => {
    it('should create bookmark', async () => {
      const userId = 1;
      jest
        .spyOn(bookmarkService, 'createBookmark')
        .mockResolvedValue(bookmarkDto);

      const result = await controller.createBookmark(userId, createBookmarkDto);

      expect(bookmarkService.createBookmark).toHaveBeenCalledWith(
        userId,
        createBookmarkDto,
      );
      expect(result).toEqual(bookmarkDto);
    });
  });

  describe('editBookmarkById', () => {
    it('should edit a bookmark', async () => {
      const userId = 1,
        bookmarkId = 1;
      jest
        .spyOn(bookmarkService, 'editBookmarkById')
        .mockResolvedValue(bookmarkDto);
      const result = await controller.editBookmarkById(
        userId,
        bookmarkId,
        updatebookmarkDto,
      );

      expect(bookmarkService.editBookmarkById).toHaveBeenCalledWith(
        userId,
        bookmarkId,
        updatebookmarkDto,
      );
      expect(result).toEqual(bookmarkDto);
    });
  });

  describe('deleteBookmarkById', () => {
    it('should delete a bookmar by id', async () => {
      const userId = 1,
        bookmarkId = 1;
      jest.spyOn(bookmarkService, 'deleteBookmarkById').mockResolvedValue();
      const result = await controller.deleteBookmarkById(userId, bookmarkId);

      expect(bookmarkService.deleteBookmarkById).toHaveBeenCalledWith(
        userId,
        bookmarkId,
      );
      expect(result).toEqual(undefined);
    });
  });
});
