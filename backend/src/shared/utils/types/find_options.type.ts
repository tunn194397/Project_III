import { EntityCondition } from './entity_condition.type';

export type FindOptions<T> = {
  where: EntityCondition<T>;
};
