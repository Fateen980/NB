import { InputType, Field  } from 'type-graphql';
import {MaxLength, Min,Max,Length,IsInt, IsString,IsNotEmpty} from 'class-validator'
import { ObjectID } from 'typeorm';


@InputType()
export default class NewCustomerInput {

    @Field()
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @Field()
    @Length(10)
    @IsNotEmpty()
    phone:string

    @Field()
    @IsNotEmpty()
    city:string;

    @Field()
    @IsInt()
    status: number;
  
    @Field()
    @IsInt()
    type:number

    @Field()
    @MaxLength(50)
    @IsNotEmpty()
    address:string

}