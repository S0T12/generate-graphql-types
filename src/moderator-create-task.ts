import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateModeratorTaskDto {
  @IsNotEmpty({ message: 'موضوع نباید خالی باشد' })
  @IsString({ message: 'موضوع باید رشته باشد' })
  @Length(5, 50)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  senderSectionId: number;

  @IsNotEmpty({ message: 'توضیحات نباید خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  description: string;

  @IsNotEmpty({ message: 'زمان پایان نباید خالی باشد' })
  @Type(() => Date)
  endDate: Date;

  @IsNotEmpty({ message: 'زمان شروع نباید خالی باشد' })
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @IsString({ message: 'تسک ایدی باید رشته باشد' })
  ticketId?: string;

  @IsNotEmpty({ message: 'اکانت فرستنده نباید خالی باشد' })
  @IsNumber({}, { message: 'اکانت فرستنده باید عدد باشد' })
  senderId: number;

  @IsNotEmpty({ message: 'اکانت ایدی نباید خالی باشد' })
  @IsNumber({}, { message: 'اکانت ایدی باید عدد باشد' })
  receiverId: number;

  @IsNotEmpty({ message: 'رول گیرنده نباید خالی باشد' })
  @IsString({ message: 'رول گیرنده ایدی باید رشته باشد' })
  receiverRole: string;

  @IsNotEmpty()
  @IsString()
  senderRole: string;

  @IsOptional()
  @IsString({ each: true })
  fileIds?: string[];
}

// @InputType()
// export class CreateModeratorTaskInput {
//   @Field(() => String)
//   title: string;

//   @Field(() => Int)
//   senderSectionId: number;

//   @Field(() => String)
//   description: string;

//   @Field(() => Date)
//   endDate: Date;

//   @Field(() => Date)
//   startDate: Date;

//   @Field(() => String)
//   ticketId: string;

//   @Field(() => Int)
//   senderId: number;

//   @Field(() => Int)
//   receiverId: number;

//   @Field(() => String)
//   receiverRole: string;

//   @Field(() => String)
//   senderRole: string;

//   @Field(() => [String])
//   fileIds?: string[];
// }
