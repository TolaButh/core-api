import { PartialType } from '@nestjs/mapped-types';
import { CreateGbprimpayDto } from './create-gbprimpay.dto';

export class UpdateGbprimpayDto extends PartialType(CreateGbprimpayDto) {}
