import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async createArticle(
    userId: number,
    data: {
      title: string;
      content: string;
      tags?: string[];
      isPublic?: boolean;
    },
  ) {
    return this.prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        tags: data.tags ?? [],
        isPublic: data.isPublic ?? false,
        authorId: userId,
      },
    });
  }

  async getArticle(id: number, userId?: number) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      return null;
    }

    if (!article.isPublic && (!userId || userId !== article.authorId)) {
      throw new ForbiddenException('You do not have access to this article');
    }

    return article;
  }

  async listArticles(tags?: string[], userId?: number) {
    const where = tags && tags.length > 0 ? { tags: { hasSome: tags } } : {};

    if (!userId) {
      Object.assign(where, { isPublic: true });
    }

    return this.prisma.article.findMany({ where });
  }

  async updateArticle(
    userId: number,
    id: number,
    data: {
      title?: string;
      content?: string;
      tags?: string[];
      isPublic?: boolean;
    },
  ) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      return null;
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('Not your article');
    }

    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async deleteArticle(userId: number, id: number) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      return null;
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('Not your article');
    }

    return this.prisma.article.delete({ where: { id } });
  }
}
