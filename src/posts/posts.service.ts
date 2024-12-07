import { Body, Injectable, UsePipes } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.entity';
import { FilesService } from '../files/files.service';
import { CreatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post,
              private fileService: FilesService) {}

  create(postDto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image)
    const post = await this.postRepository.create({
      ...postDto,
      image: fileName
    })
    return post
  }

}
