/* ############################################################################
 * Swagger向け情報
 * ######################################################################### */
import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';
export class ItemDto {
    @ApiModelProperty( { required: false } )
    name?: string;
    @ApiModelProperty( { required: false } )
    code?: string;
}
