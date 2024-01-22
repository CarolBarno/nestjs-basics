import { Test, TestingModule } from "@nestjs/testing";
import { BookmarkController } from "./bookmark.controller";
import { BookmarkService } from "./bookmark.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import { bookmarkDto, createBookmarkDto, updatebookmarkDto } from "../../test/utils/test-objects";



describe('Bookmark Service', () => {
    let bookmarkController: BookmarkController;
    let bookmarkServiceMock: Partial<BookmarkService>;

    beforeEach(async () => {
        bookmarkServiceMock = {
            getBookmarks: jest.fn(),
            getBookmarkById: jest.fn(),
            createBookmark: jest.fn(),
            editBookmarkById: jest.fn(),
            deleteBookmarkById: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookmarkController],
            providers: [
                { provide: BookmarkService, useValue: bookmarkServiceMock },
                { provide: PrismaService, useValue: {} }
            ]
        }).compile();

        bookmarkController = module.get<BookmarkController>(BookmarkController);
    });

    describe('getBookmarks', () => {
        it('should return an array of bookmarks', async () => {
            const userId = 1;
            jest.spyOn(bookmarkServiceMock, 'getBookmarks').mockResolvedValue([bookmarkDto]);
            const result = await bookmarkController.getBookmarks(userId);

            expect(bookmarkServiceMock.getBookmarks).toHaveBeenCalledWith(userId);
            expect(result).toEqual([bookmarkDto]);
        });
    });

    describe('getBookmarkById', () => {
        it('should get bookmark by id', async () => {
            const bookmarkId = 1, userId = 1;
            jest.spyOn(bookmarkServiceMock, 'getBookmarkById').mockResolvedValue(bookmarkDto);
            const result = await bookmarkController.getBookmarkById(userId, bookmarkId);

            expect(bookmarkServiceMock.getBookmarkById).toHaveBeenCalledWith(userId, bookmarkId);
            expect(result).toEqual(bookmarkDto);
        });
    });

    describe('createBookmark', () => {
        it('should create bookmark', async () => {
            const userId = 1;
            jest.spyOn(bookmarkServiceMock, 'createBookmark').mockResolvedValue(bookmarkDto);
            const result = await bookmarkController.createBookmark(userId, createBookmarkDto);

            expect(bookmarkServiceMock.createBookmark).toHaveBeenCalledWith(userId, createBookmarkDto);
            expect(result).toEqual(bookmarkDto);
        });
    });

    describe('editBookmarkById', () => {
        it('should edit a bookmark', async () => {
            const userId = 1, bookmarkId = 1;
            jest.spyOn(bookmarkServiceMock, 'editBookmarkById').mockResolvedValue(bookmarkDto);
            const result = await bookmarkController.editBookmarkById(userId, bookmarkId, updatebookmarkDto);

            expect(bookmarkServiceMock.editBookmarkById).toHaveBeenCalledWith(userId, bookmarkId, updatebookmarkDto);
            expect(result).toEqual(bookmarkDto);
        });
    });

    describe('deleteBookmarkById', () => {
        it('should delete a bookmar by id', async () => {
            const userId = 1, bookmarkId = 1;
            jest.spyOn(bookmarkServiceMock, 'deleteBookmarkById').mockResolvedValue();
            const result = await bookmarkController.deleteBookmarkById(userId, bookmarkId);

            expect(bookmarkServiceMock.deleteBookmarkById).toHaveBeenCalledWith(userId, bookmarkId);
            expect(result).toEqual(undefined);
        });
    });
});
