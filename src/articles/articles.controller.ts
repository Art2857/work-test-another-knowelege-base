import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async list(@Query('tags') tags: string) {
    const tagList = tags ? tags.split(',') : [];
    return this.articlesService.listArticles(tagList);
  }

  @Get(':id')
  async get(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.userId;
    return this.articlesService.getArticle(Number(id), userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    body: {
      title: string;
      content: string;
      tags?: string[];
      isPublic?: boolean;
    },
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return this.articlesService.createArticle(userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      title?: string;
      content?: string;
      tags?: string[];
      isPublic?: boolean;
    },
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return this.articlesService.updateArticle(userId, Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.userId;
    return this.articlesService.deleteArticle(userId, Number(id));
  }
}
