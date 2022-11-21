import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/database/entities/User.entity';
import userResponseSerializer from 'src/modules/user/user-response.serializer';
import deepMapObject from './deep-map-object';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        return deepMapObject(data, (value) => {
          if (value.__entity === 'User') {
            userResponseSerializer(value as User);
          }

          return value;
        });
      }),
    );
  }
}
