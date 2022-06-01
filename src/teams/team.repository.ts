import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { City, CityDocument } from 'src/cities/entities/city.entity';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Team, TeamDocument } from './entities/team.entity';
// import { Region, RegionDocument } from './entities/region.entity';

@Injectable()
export class TeamRepository extends BaseAbstractRepository<Team> {
    constructor(
        @InjectModel(Team.name) private teamModel: Model<TeamDocument>,

    )
    {
        super(teamModel);
    }
    // //aggrigation 

}
