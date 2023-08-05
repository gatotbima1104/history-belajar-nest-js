import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    // config service for taking database_url variabel from .env 
    constructor(config: ConfigService){
        super({
            datasources:{
                db:{
                    url: config.get('DATABASE_URL')
                }
            }
        })
    }
}
