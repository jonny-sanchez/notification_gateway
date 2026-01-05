import 'dotenv/config'
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const basicHeader:string = request?.headers?.authorization || ''

    const [type, credentials] = basicHeader.split(' ');

    if(type !== 'Basic') throw new UnauthorizedException("Auth method invalid.")
    if(!credentials) throw new UnauthorizedException("Not credentials send.")

        //{ususario} y {password} del basic header auth
    const [login, password] = Buffer.from(credentials, 'base64').toString('utf-8').split(':')

    if(login !== process.env.BASIC_AUTH_USER || password !== process.env.BASIC_AUTH_PASS) throw new UnauthorizedException(`Credenciales incorrectas.`);

    // return validateRequest(request);
    // throw new UnauthorizedException(`hola prueba`)
    return true
  }
}
