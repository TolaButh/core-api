import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

import { CreateBonusDto } from "./create.bonus.dto";

export class UpdateBonusDto extends PartialType(CreateBonusDto) {}