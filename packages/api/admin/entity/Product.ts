import { isInt, Min } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {Entity, Column, BaseEntity, ObjectIdColumn, ObjectID} from "typeorm";

@ObjectType()
@Entity()
export default class Product extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    _id: ObjectID;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    price:number   

    @Field({ defaultValue:false })
    @Column()
    status:boolean

}