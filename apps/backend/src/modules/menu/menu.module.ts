import { Module } from '@nestjs/common';

import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MenuModule {}
