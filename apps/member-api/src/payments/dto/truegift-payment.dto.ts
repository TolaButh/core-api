import { ApiProperty } from "@nestjs/swagger";

export class TrueGiftPaymentDto {

    @ApiProperty({
        type:String,
        example: 'https://gift.truemoney.com/campaign/?v=e209d6e5d0c64b8703a37fb022eaee23e0F',
    })
    link: string;
  

}
