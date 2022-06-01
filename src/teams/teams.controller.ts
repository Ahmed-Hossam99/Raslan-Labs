import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { CreateAboutDto } from 'src/about/dto/create-about.dto';
import { FilterQueryOptionsAbout } from 'src/about/dto/filterQueryOptions.dto';
import { UpdateAboutDto } from 'src/about/dto/update-about.dto';
import { AboutDocument } from 'src/about/entities/about.entity';
import { FilterQueryOptionsUser } from 'src/users/dto/filterQueryOptions.dto';
import { TeamDocument } from './entities/team.entity';
@ApiBearerAuth()
@ApiTags('Teams')
@Controller('teams')
export class TeamsController
{
  constructor(private readonly teamsService: TeamsService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  create(@UploadedFiles()
  files,
    @Body() createTeamDto: CreateTeamDto): Promise<TeamDocument>
  {
    if (files && files.photo)
    {
      console.log(files)
      createTeamDto.photo = files.photo[0].secure_url;
      console.log(createTeamDto.photo)
    }
    console.log(createTeamDto)
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  async findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<AboutDocument> | AboutDocument[]>
  {
    return await this.teamsService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsUser,
    );
  }



  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  update(
    @UploadedFiles()
    files,
    @Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto)
  {
    if (files && files.photo) updateTeamDto.photo = files.photo[0].secure_url;
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    return await this.teamsService.remove(id);
  }
}
