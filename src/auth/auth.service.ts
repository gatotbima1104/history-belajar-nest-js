import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    // register logic business
    async signUp(dto: AuthDto){

        try {
            // generate hash password
            const hash = await argon.hash(dto.password)
    
            // save user in db 
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            })
    
            // // for deleting the hashed password
            // delete user.hash;
    
            // // return the saved user 
            // return user
            return this.signToken(user.id, user.email)

            
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if (error.code === 'P2002'){
                    throw new ForbiddenException(
                        'Email has been taken',
                    )
                }
            }
            throw error;
        }
    }


    // login logic business
    async signIn(dto: AuthDto){
        // find user by Email
        const user = await this.prisma.user.findUnique({
            where:{
                email: dto.email,
            }
        })

        // if user not exist throw error
        if (!user){
            throw new ForbiddenException('Email is not found')
        }

        // match password 
        const pwValid = await argon.verify(user.hash, dto.password)

        // if not match return forbidden 
        if(!pwValid){
            throw new ForbiddenException('Password is incorrect')
        }

        // // delete hashed password
        // delete user.hash

        // return user 
        return this.signToken(user.id, user.email)
    }

    // use jwt to authenticate
    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        // intializate the payload 
        const payload = {
            // sub commonly used for convention JWT token
            sub: userId,
            email,
        }

        // call the secret password 
        const secret = this.config.get('JWT_SECRET')

        // token jwt return
        const token = await this.jwt.signAsync(
            payload, 
            {
            expiresIn: '15m',
            secret: secret
            }
        )
        return{
            access_token: token
        }
        
    }
}
