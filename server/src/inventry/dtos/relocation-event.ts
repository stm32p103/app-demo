import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';

/* ############################################################################
 * Swagger向け情報
 * ######################################################################### */
export class RelocationEventDto {
    @ApiModelProperty()
    itemCode: string;
    @ApiModelProperty()
    locationCode: string;
}
