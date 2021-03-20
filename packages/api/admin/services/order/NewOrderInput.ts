import { InputType, Field, Float,ObjectType } from 'type-graphql';
import {MaxLength, Min,Max,Length,IsInt, IsString,IsNotEmpty , IsDate, IsNumber} from 'class-validator'


@ObjectType()
class Customer {

  @Field()
  name:string

  @Field()
  phone: string;

}


@InputType()
export default class NewOrderInput {


    @Field()
    @IsString()
    @IsNotEmpty()
    product_id:string


    @Field(() => Float)
    @IsNumber()
    price: number;
  
    @Field(() => Float)
    @IsNumber()
    deliveryAmount:number

    @Field()
    @IsDate()
    @IsNotEmpty()
    date:Date

    @Field()
    @IsDate()
    deliveryDate:Date

    @Field()
    @IsInt()
    quantity:number

    @Field(() => Float)
    @IsNumber()
    total:number

    @Field(type => [String])
    customers: string[];

}


