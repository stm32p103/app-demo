import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';

/* ############################################################################
 * Swagger向け情報
 * ######################################################################### */
export class ItemDto {
    @ApiModelProperty( { required: false } )
    name?: string;
    @ApiModelProperty( { required: false } )
    code?: string;
}
