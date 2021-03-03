
import { Field, Float, ID, ObjectType } from "type-graphql";
import {Entity, Column, BaseEntity, ObjectIdColumn, ObjectID} from "typeorm";

@ObjectType()
@Entity()
export default class Order extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    _id: ObjectID;

    @Field()
    @Column()
    customer_id: string;

    @Field()
    @Column()
    product_id: string;


    @Field( { defaultValue:0.00 })
    @Column()
    price:number
    
    @Field({ defaultValue:0.00 })
    @Column()
    deliveryAmount:number  

    @Field({ defaultValue:0 })
    @Column()
    status:number

    @Field()
    @Column( {default : new Date()} )
    date:Date

    @Field()
    @Column()
    deliveryDate:Date


    @Field({ defaultValue:1 })
    @Column()
    quantity:number

    @Field({ defaultValue:0 })
    @Column()
    total:number

}