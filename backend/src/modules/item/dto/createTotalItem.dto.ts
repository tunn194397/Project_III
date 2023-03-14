import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, Validate} from "class-validator";
import {IsNotExist} from "../../../shared/utils/validators/is_not_exists.validator";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {CreateItemDto} from "./createItem.dto";
import {CreateItemParameterDto} from "./createItemParameter.dto";

export class CreateTotalItemDto {
    @ApiModelProperty({
        type: CreateItemDto,
        example: {
            name: "Laptop HP 15s-fq2712TU",
            type: "Laptop",
            price: 11590000,
            content: "Laptop HP chính hãng",
            image: "https://lh3.googleusercontent.com/PjhHXXreUCNNLITAJ3gfR2heYwi7JRjbjIwC4Rh-zDi8cUqQT0CoVQVQ0WzoOuKG487h__xpEZQ_zQDXfWvRWWrKDYFSmc0wZA=w500-rw",
            introduce: "Laptop HP chính hãng ....",
            branch: 'HP',
            deviceTypeId: 1,
            productionTime: (new Date('1/2/2023')).getTime(),
            productionCode: '221101761',
            supplyId: 1
        }
    })
    @IsNotEmpty()
    item: CreateItemDto;

    @ApiModelProperty({
        type: Array,
        example: [
            {
                deviceParameterId: 1,
                value:'HP',
                detail: 'HP'
            },
            {
                deviceParameterId: 2,
                value:'12',
                detail: '12'
            },
            {
                deviceParameterId: 3,
                value:'HP 15s',
                detail: 'HP 15s'
            },
            {
                deviceParameterId: 4,
                value:'7C0X2PA',
                detail: '7C0X2PA'
            },
            {
                deviceParameterId: 5,
                value:'Bạc',
                detail: 'Bạc'
            },
            {
                deviceParameterId: 6,
                value:'Văn phòng, Doanh nghiệp, Học sinh - Sinh viên',
                detail: 'Văn phòng, Doanh nghiệp, Học sinh - Sinh viên',
            },
            {
                deviceParameterId: 7,
                value:'Core i3 , Intel Core thế hệ thứ 11',
                detail: 'Core i3 , Intel Core thế hệ thứ 11'
            },
            {
                deviceParameterId: 8,
                value:'Intel Core i3-1115G4 ( 3.0 GHz - 4.10 GHz / 6MB / 2 nhân, 4 luồng ) i3-1115G4',
                detail: 'Intel Core i3-1115G4 ( 3.0 GHz - 4.10 GHz / 6MB / 2 nhân, 4 luồng ) i3-1115G4'
            },
            {
                deviceParameterId: 9,
                value:'1 x 8GB DDR4 3200MHz ( 2 Khe cắm)',
                detail: '1 x 8GB DDR4 3200MHz ( 2 Khe cắm)'
            },
            {
                deviceParameterId: 10,
                value:'Onboard Intel Iris Xe Graphics',
                detail: 'Onboard Intel Iris Xe Graphics'
            },
            {
                deviceParameterId: 11,
                value: '15.6" ( 1920 x 1080 ) Full HD IPS không cảm ứng , Màn hình chống lóa , HD webcam',
                detail: '15.6" ( 1920 x 1080 ) Full HD IPS không cảm ứng , Màn hình chống lóa , HD webcam'
            },
            {
                deviceParameterId: 12,
                value:'256GB SSD M.2 NVMe /',
                detail: '256GB SSD M.2 NVMe /'
            },
            {
                deviceParameterId: 13,
                value:'Không',
                detail: 'Không'
            },
            {
                deviceParameterId: 14,
                value:'1 x M.2 NVMe',
                detail: '1 x M.2 NVMe'
            },
            {
                deviceParameterId: 15,
                value:'M.2 NVMe',
                detail: 'M.2 NVMe'
            },
            {
                deviceParameterId: 16,
                value:'1 x HDMI',
                detail: '1 x HDMI'
            },
            {
                deviceParameterId: 17,
                value:'1 x USB Type C , 2 x USB 3.2 , 1 x SD card slot , Audio combo',
                detail: '1 x USB Type C , 2 x USB 3.2 , 1 x SD card slot , Audio combo'
            },
            {
                deviceParameterId: 18,
                value:'WiFi 802.11ac , Bluetooth 5.0',
                detail: 'WiFi 802.11ac , Bluetooth 5.0'
            },
            {
                deviceParameterId: 19,
                value:'thường , có phím số',
                detail: 'thường , có phím số'
            },
            {
                deviceParameterId: 20,
                value:'Windows 11 Home SL Windows 11',
                detail: 'Windows 11 Home SL Windows 11'
            },
            {
                deviceParameterId: 21,
                value:'35.85 x 24.2 x 1.79 cm',
                detail: '35.85 x 24.2 x 1.79 cm'
            },
            {
                deviceParameterId: 22,
                value:'3 cell 41 Wh , Pin liền',
                detail: '3 cell 41 Wh , Pin liền'
            },
            {
                deviceParameterId: 23,
                value:'1.7 kg',
                detail: '1.7 kg'
            },
            {
                deviceParameterId: 24,
                value: 'không đèn',
                detail: 'không đèn'
            },
            {
                deviceParameterId: 25,
                value:'Adapter, dây nguồn,…',
                detail: 'Adapter, dây nguồn,…'
            },
            {
                deviceParameterId: 26,
                value:'Không',
                detail: 'Không'
            },
            {
                deviceParameterId: 27,
                value:'Không',
                detail: 'Không'
            }
        ]
    })
    @IsNotEmpty()
    itemParameters: CreateItemParameterDto[];


}