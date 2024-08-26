import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateModeratorTaskInput {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  senderSectionId: number;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  endDate: Date;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Int)
  senderId: number;

  @Field(() => Int)
  receiverId: number;

  @Field(() => String)
  receiverRole: string;

  @Field(() => String)
  senderRole: string;
}
