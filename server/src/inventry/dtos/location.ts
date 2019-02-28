import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';

/* ############################################################################
 * Swagger向け情報
 * ######################################################################### */
export class LocationDto {
    @ApiModelProperty( { required: false } )
    name?: string;
    @ApiModelProperty( { required: false } )
    code?: string;
}
