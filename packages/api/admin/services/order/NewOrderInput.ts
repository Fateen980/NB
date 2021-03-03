import { InputType, Field, Float  } from 'type-graphql';
import {MaxLength, Min,Max,Length,IsInt, IsString,IsNotEmpty , IsDate, IsNumber} from 'class-validator'



@InputType()
export default class NewOrderInput {

    @Field()
    @IsString()
    @IsNotEmpty()
    customer_id: string;

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

}