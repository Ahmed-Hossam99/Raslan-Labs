import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateTeamDto } from 'src/teams/dto/create-team.dto';
import { TeamDocument } from 'src/teams/entities/team.entity';
import { FileDocument } from './entities/file.entity';
import { ApiMultiFile } from 'src/shared/decorators/api-file.decorator';
@ApiBearerAuth()
@ApiTags('Files')
@Controller('files')
export class FilesController
{
  constructor(private readonly filesService: FilesService) { }

  @Post('/photos')
  @UseInterceptors(FilesInterceptor('photos'))
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile('photos')
  createPhotos(@UploadedFiles()
  files,
    @Body() createFileDto: CreateFileDto): Promise<FileDocument>
  {
    let filesUp = []
    console.log(files)
    if (files)
    {
      for (let i = 0; i < files.length; i++)
      {
        console.log(files[i].secure_url)
        filesUp.push(files[i].secure_url)
      }
      createFileDto.photos = filesUp
    }
    console.log(filesUp)

    return this.filesService.create(createFileDto);
  }

  @Post('/pdf')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile('files')
  createFile(@UploadedFiles()
  files,
    @Body() createFileDto: CreateFileDto): Promise<FileDocument>
  {
    let filesUp = []
    console.log(files)
    if (files)
    {
      for (let i = 0; i < files.length; i++)
      {

        filesUp.push(files[i].secure_url)
      }
      createFileDto.files = filesUp
    }
    return this.filesService.create(createFileDto);
  }

  @Get()
  findAll()
  {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto)
  {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string)
  {
    return this.filesService.remove(+id);
  }
}
