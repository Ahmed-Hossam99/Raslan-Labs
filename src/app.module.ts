import { Module, UseInterceptors } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PhoneConfirmationModule } from './phone-confirmation/phone-confirmation.module';
import { DatabaseModule } from './database.module';
import { ChatModule } from './chat/chat.module';
// import { CityController } from './city/city.controller';
import { ResultsModule } from './results/results.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { TopicsModule } from './topics/topics.module';
import { CategoriesModule } from './categories/categories.module';
import { BranchesModule } from './branches/branches.module';
import { InstructionsModule } from './instructions/instructions.module';
import { ContactsModule } from './contacts/contacts.module';
import { AdsModule } from './ads/ads.module';
import { AboutModule } from './about/about.module';
import { TeamsModule } from './teams/teams.module';
import { CitiesModule } from './cities/cities.module';
import { RegionsModule } from './regions/regions.module';
// import { CityModule } from './city/city.module';
// import { CityController } from './city/city.controller';
// import { CityModule } from './city/city.module';
// import { CityController } from './city/city.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PhoneConfirmationModule,
    ChatModule,
    // CityModule,
    RegionsModule,
    CitiesModule,
    TeamsModule,
    AboutModule,
    AdsModule,
    ContactsModule,
    InstructionsModule,
    BranchesModule,
    CategoriesModule,
    TopicsModule,
    FilesModule,
    ProductsModule,
    OrdersModule,
    ResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
