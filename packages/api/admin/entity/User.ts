import { Min } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {Entity, Column, BaseEntity, ObjectIdColumn, ObjectID} from "typeorm";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    _id: ObjectID;

    @Field()
    @Column()
    name: string;


    @Field()
    @Column("text",{ unique:true })
    email: string;


    @Column()
    @Min(8)
    password: string;

    @Field()
    @Column()
    isActive: boolean;
 

}