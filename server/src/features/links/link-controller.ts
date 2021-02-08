// import { Router, Response, NextFunction } from 'express';
// import { parallel } from 'async';
// import DB from '../../database';
// import Controller from '../../interfaces/controller';
// import RequestWithUser from '../../interfaces/request-with-user';
// import authMiddleware from '../../middleware/auth-middleware';
// import { applyNewValues } from '../../util/object-helper';
// import { ILink, ILinkTag } from '../../database/models/link';
// import { ITag } from '../../database/models/tag';
// import HttpException from '../../exceptions/http-exception';
// import { getLinkInfo } from './link-processor';
// import * as multer from 'multer';

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// interface ImportedLink {
//   title?: string;
//   url?: string;
//   notes?: string;
//   createDate?: Date;
//   tags?: string[];
// }

// class LinkController implements Controller {
//   public path = '/api/links';
//   public router = Router();
//   tagCache: ITag[] = [];

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes = () => {
//     this.router.get(`${this.path}`, authMiddleware, this.getLinks);
//     this.router.post(`${this.path}`, authMiddleware, this.createLink);
//     this.router.patch(`${this.path}/:id`, authMiddleware, this.updateLink);
//     this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteLink);
//     this.router.put(`${this.path}/:id/tags`, authMiddleware, this.setLinkTags);
//     this.router.post(
//       `${this.path}/import`,
//       authMiddleware,
//       upload.single('linkfile'),
//       this.importLinks,
//     );
//   };

//   private getLinks = async (request: RequestWithUser, response: Response, next: NextFunction) => {
//     try {
//       const userId = request.userId;
//       const tag = request.params['tag'];
//       const links = await DB.Models.Link.findByUser(userId).sort('-createDate');
//       response.status(200).json(links);
//       return;
//     } catch (error) {
//       next(error);
//     }
//   };

//   private createLink = async (request: RequestWithUser, response: Response, next: NextFunction) => {
//     try {
//       if (!request.body.url || request.body.url.length === 0)
//         return next(new HttpException(400, 'URL is required!'));

//       const linkInfo = await getLinkInfo(request.body.url);

//       const link = new DB.Models.Link({
//         url: request.body.url,
//         title: request.body.title ?? linkInfo.title,
//         createDate: new Date(),
//         userId: request.userId,
//       });
//       if (!!request.body.notes) link.notes = request.body.notes;
//       if (!!request.body.tags) {
//         link.tags = [];
//         const tasks = (request.body.tags as string[]).map((tagName) => {
//           return async () => {
//             const tag = await this.getOrCreateTag(tagName, request.userId);
//             link.tags.push({
//               tagId: tag._id,
//               title: tag.title,
//             } as ILinkTag);
//           };
//         });
//         await parallel(tasks);
//       }
//       await link.save();
//       return response.json(link);
//     } catch (error) {
//       next(error);
//     }
//   };

//   private getOrCreateTag = async (tagName: string, userId: string): Promise<ITag> => {
//     if (this.tagCache.length === 0)
//       this.tagCache = await DB.Models.Tag.findByUserAndType(userId, 'link');
//     let tag = this.tagCache.find((t) => t.title === tagName);
//     if (!tag) {
//       tag = new DB.Models.Tag({
//         title: tagName,
//         type: 'link',
//         userId,
//       });
//       await tag.save();
//       this.tagCache.push(tag);
//     }
//     return tag;
//   };

//   private updateLink = async (request: RequestWithUser, response: Response, next: NextFunction) => {
//     try {
//       const link = (await DB.Models.Link.findById(request.params.id)) as ILink;
//       if (link.userId.toString() !== request.userId)
//         return next(new HttpException(404, 'Link not found'));
//       applyNewValues(link, request.body, ['title', 'url', 'notes']);
//       // TODO: update tags (link and tags table?)
//       await link.save();
//       return response.status(200).json(link);
//     } catch (error) {
//       next(error);
//     }
//   };

//   private deleteLink = async (request: RequestWithUser, response: Response, next: NextFunction) => {
//     try {
//       const link = (await DB.Models.Link.findById(request.params.id)) as ILink;
//       if (link.userId.toString() !== request.userId)
//         return next(new HttpException(404, 'Link not found'));
//       await DB.Models.Link.findByIdAndDelete(request.params.id);
//       return response.status(200).end();
//     } catch (error) {
//       next(error);
//     }
//   };

//   private setLinkTags = async (
//     request: RequestWithUser,
//     response: Response,
//     next: NextFunction,
//   ) => {
//     try {
//       const link = (await DB.Models.Link.findById(request.params.id)) as ILink;
//       if (link.userId.toString() !== request.userId)
//         return next(new HttpException(404, 'Link not found'));
//       if (!request.body.tags) return next(new HttpException(400, 'Tags are required'));
//       link.tags = [];
//       (request.body.tags as ILinkTag[]).map((tag) => {
//         link.tags.push(tag);
//       });
//       await link.save();
//       return response.status(200).json(link);
//     } catch (error) {
//       next(error);
//     }
//   };

//   private importLinks = async (
//     request: RequestWithUser,
//     response: Response,
//     next: NextFunction,
//   ) => {
//     try {
//       const fileText = request.file.buffer.toString('utf8').trim();
//       const importLinks = JSON.parse(fileText) as ImportedLink[];
//       const failed: string[] = [];
//       for (const link of importLinks) {
//         await this.processImportLink(link, request.userId).catch((e) => {
//           failed.push(link.url);
//         });
//       }
//       return response.json({ links: importLinks.length, failed });
//     } catch (error) {
//       next(error);
//     }
//   };

//   private processImportLink = async (link: ImportedLink, userId: string) => {
//     if (!link.title) {
//       const linkInfo = await getLinkInfo(link.url);
//       link.title = linkInfo.title;
//     }

//     const newLink = new DB.Models.Link({
//       url: link.url,
//       title: link.title,
//       notes: link.notes,
//       createDate: link.createDate ?? new Date(),
//       userId: userId,
//     });
//     if (!!link.tags) {
//       newLink.tags = [];
//       for (const tagName of link.tags) {
//         const tag = await this.getOrCreateTag(tagName, userId);
//         newLink.tags.push({
//           tagId: tag._id,
//           title: tag.title,
//         } as ILinkTag);
//       }
//     }
//     await newLink.save();
//   };
// }

// export default LinkController;
