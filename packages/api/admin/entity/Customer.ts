import { Field, ID, ObjectType } from "type-graphql";
import {Entity, Column, BaseEntity, ObjectIdColumn, ObjectID} from "typeorm";


@ObjectType()
@Entity()
export default class Customer extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    _id: ObjectID;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column("text",{ unique:true })
    phone: string;

    @Field()
    @Column()
    city:string;

    @Field()
    @Column()
    address: string;

    @Field()
    @Column()
    status: number;

    @Field()
    @Column()
    type:number

}