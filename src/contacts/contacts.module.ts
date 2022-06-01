import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactsSchema } from './entities/contact.entity';
import { RegionRepository } from 'src/regions/region.repository';
import { ContactRepository } from './contact.repository';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, ContactRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Contact.name,
        schema: ContactsSchema
      },
    ])
  ]
})
export class ContactsModule { }
