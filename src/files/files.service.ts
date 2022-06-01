import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileRepository } from './file.repository';

@Injectable()
export class FilesService
{
  constructor(private readonly fileRepository: FileRepository) { }

  async create(createfileDto: CreateFileDto)
  {
    return await this.fileRepository.create(createfileDto);
  }

  findAll()
  {
    return `This action returns all files`;
  }

  findOne(id: number)
  {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto)
  {
    return `This action updates a #${id} file`;
  }

  remove(id: number)
  {
    return `This action removes a #${id} file`;
  }
}
