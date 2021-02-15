import { Field, ID, ObjectType } from "type-graphql";
import {Entity, Column, BaseEntity, ObjectIdColumn, ObjectID} from "typeorm";

@ObjectType()
@Entity()
export default class City extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    _id: ObjectID;

    @Field()
    @Column()
    name: string;

}