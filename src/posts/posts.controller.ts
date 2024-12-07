import { Body, Controller, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './posts.dto';
import { Post } from './posts.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ type: Post })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@Body() postDto: CreatePostDto, @UploadedFile() image) {
    return this.postsService.create(postDto, image);
  }
}
