<template>
    <div id="lostItemEdit">
        <Modal :value="true" class="noContentPadding" :mask-closable="false" width="40" :styles="{top: '3%'}" title="失物信息录入" @on-cancel="closeAction">
            <div class="modalTable" :style="{maxHeight: (height-200)+'px',overflowY: 'auto'}">
                <div style="padding: 10px;">
                <div class="modalTitle">基本信息：</div>
                <div class="detail">
                    <table>
                        <template v-if="!!itemInfo.id">
                            <tr>
                                <td class="label" style="width: 250px;">失物编号</td>
                                <td style="width: 40%;">{{itemInfo.lostItemCode}}</td>
                            </tr>
                        </template>
                        <tr>
                            <td class="label" style="width: 250px;"><span class="request">*</span>失物名称</td>
                            <td style="width: 40%;"><Input v-model="itemInfo.lostTitle" placeholder="请输入失物名称" style="width: 100%" /></td>
                        </tr>
                        <template v-if="!!itemInfo.id">
                            <tr>
                                <td class="label"><span class="request">*</span>失物状态</td>
                                <td>
                                    <template>
                                        <Select v-model="itemInfo.lostItemStatus" placeholder="选择失物状态" style="width: 100%;">
                                            <template v-for="(item, index) in $config.lostItemStatus">
                                                <template v-if="index>0 && index!=9">
                                                    <Option :value="item.id" :key="index">{{item.name}}</Option>	
                                                </template>
                                            </template>
                                        </Select>
                                    </template>
                                </td>
                            </tr>
                        </template>
                        <tr>
                            <td class="label"><span class="request">*</span>失物数量</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.lostAmount" placeholder="请输失物数量" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label"><span class="request">*</span>一级分类</td>
                            <td>
                                <template>
                                    <Select v-model="itemInfo.firstCateId" placeholder="选择一级分类" style="width: 100%;">
                                        <template v-for="(item, index) in cate1">
                                            <Option :value="item.id" :key="index">{{item.cateName}}</Option>
                                        </template>
                                    </Select>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label"><span class="request">*</span>二级分类</td>
                            <td>
                                <template>
                                    <Select v-model="secondInfo" @on-change="secondItemChange" placeholder="选择二级分类" style="width: 100%;">
                                        <template v-for="(item, index) in cate2">
                                            <Option :value="JSON.stringify(item)" :key="index">{{item.cateName}}</Option>
                                        </template>
                                    </Select>
                                </template>
                            </td>
                        </tr>
                        <template v-if="!!secondItem">
                            <template v-if="!!secondItem.propName1">
                            <tr>
                                <td class="label">
                                    <template v-if="secondItem.propMustInput1==1">
                                        <span class="request">*</span>
                                    </template>
                                    {{secondItem.propName1}}
                                </td>
                                <td>
                                    <template v-if="secondItem.propInputType1==0">
                                        <Input v-model="itemInfo.catePropValue1"  :placeholder="'请输入'+secondItem.propName1" style="width: 100%" />
                                    </template>
                                    <template v-if="secondItem.propInputType1==1">
                                        <Input v-model="itemInfo.catePropValue1" type="textarea" :row="4" :placeholder="'请输入'+secondItem.propName1" style="width: 100%" />
                                    </template>
                                    <template v-if="secondItem.propInputType1==2">
                                        <RadioGroup v-model="itemInfo.catePropValue1">
                                            <template v-for="(item, index) in (secondItem.propOptionValue1).split(',')">
                                                <Radio :label="item" :key="index">{{item}}</Radio>
                                            </template>
                                        </RadioGroup>
                                    </template>
                                    <template v-if="secondItem.propInputType1==3">
                                        <CheckboxGroup v-model="itemInfo.catePropValue1">
                                            <template v-for="(item, index) in (secondItem.propOptionValue1).split(',')">
                                                <Checkbox :label="item" :key="index">{{item}}</Checkbox>
                                            </template>
                                        </CheckboxGroup>
                                    </template>
                                    <template v-if="secondItem.propInputType1==4">
                                        <Select v-model="itemInfo.catePropValue1" :placeholder="'选择'+secondItem.propName1" style="width: 100%;">
                                            <template v-for="(item, index) in (secondItem.propOptionValue1).split(',')">
                                                <Option :value="item" :key="index">{{item}}</Option>
                                            </template>
                                        </Select>
                                    </template>
                                    <template v-if="secondItem.propInputType1==5">
                                        <DatePicker v-model="itemInfo.catePropValue1" type="date" placeholder="请选择时间" style="width: 100%;"></DatePicker>
                                    </template>
                                    <template v-if="secondItem.propInputType1==6">
                                        <DatePicker v-model="itemInfo.catePropValue1" type="datetime" placeholder="请选择时间" style="width: 100%;"></DatePicker>
                                    </template>
                                </td>
                            </tr>
                            </template>

                            <template v-if="!!secondItem.propName2">
                                <tr>
                                    <td class="label">
                                        <template v-if="secondItem.propMustInput2==1">
                                            <span class="request">*</span>
                                        </template>
                                        {{secondItem.propName2}}
                                    </td>
                                    <td>
                                        <template v-if="secondItem.propInputType2==0">
                                            <Input v-model="itemInfo.catePropValue2" :placeholder="'请输入'+secondItem.propName2" style="width: 100%" />
                                        </template>
                                        <template v-if="secondItem.propInputType2==1">
                                            <Input v-model="itemInfo.catePropValue2" type="textarea" :row="4" :placeholder="'请输入'+secondItem.propName2" style="width: 100%" />
                                        </template>
                                        <template v-if="secondItem.propInputType2==2">
                                            <RadioGroup v-model="itemInfo.catePropValue2">
                                                <template v-for="(item, index) in (secondItem.propOptionValue2).split(',')">
                                                    <Radio :label="item" :key="index">{{item}}</Radio>
                                                </template>
                                            </RadioGroup>
                                        </template>
                                        <template v-if="secondItem.propInputType2==3">
                                            <CheckboxGroup v-model="itemInfo.catePropValue2">
                                                <template v-for="(item, index) in (secondItem.propOptionValue2).split(',')">
                                                    <Checkbox :label="item" :key="index">{{item}}</Checkbox>
                                                </template>
                                            </CheckboxGroup>
                                        </template>
                                        <template v-if="secondItem.propInputType2==4">
                                            <Select v-model="itemInfo.catePropValue2" :placeholder="'选择'+secondItem.propName2" style="width: 100%;">
                                                <template v-for="(item, index) in (secondItem.propOptionValue2).split(',')">
                                                    <Option :value="item" :key="index">{{item}}</Option>
                                                </template>
                                            </Select>
                                        </template>
                                        <template v-if="secondItem.propInputType2==5">
                                            <DatePicker v-model="itemInfo.catePropValue2" type="date" placeholder="请选择时间" style="width: 100%;"></DatePicker>
                                        </template>
                                        <template v-if="secondItem.propInputType2==6">
                                            <DatePicker v-model="itemInfo.catePropValue2" type="datetime" placeholder="请选择时间" style="width: 100%;"></DatePicker>
                                        </template>
                                    </td>
                                </tr>
                            </template>

                            <template v-if="!!secondItem.propName3">
                                <tr>
                                    <td class="label">
                                        <template v-if="secondItem.propMustInput3==1">
                                            <span class="request">*</span>
                                        </template>
                                        {{secondItem.propName3}}
                                    </td>
                                    <td>
                                        <template v-if="secondItem.propInputType3==0">
                                            <Input v-model="itemInfo.catePropValue3" :placeholder="'请输入'+secondItem.propName3" style="width: 100%" />
                                        </template>
                                        <template v-if="secondItem.propInputType3==1">
                                            <Input v-model="itemInfo.catePropValue3" type="textarea" :row="4" :placeholder="'请输入'+secondItem.propName3" style="width: 100%" />
                                        </template>
                                        <template v-if="secondItem.propInputType3==2">
                                            <RadioGroup v-model="itemInfo.catePropValue3">
                                                <template v-for="(item, index) in (secondItem.propOptionValue3).split(',')">
                                                    <Radio :label="item" :key="index">{{item}}</Radio>
                                                </template>
                                            </RadioGroup>
                                        </template>
                                        <template v-if="secondItem.propInputType3==3">
                                            <CheckboxGroup v-model="itemInfo.catePropValue3">
                                                <template v-for="(item, index) in (secondItem.propOptionValue3).split(',')">
                                                    <Checkbox :label="item" :key="index">{{item}}</Checkbox>
                                                </template>
                                            </CheckboxGroup>
                                        </template>
                                        <template v-if="secondItem.propInputType3==4">
                                            <Select v-model="itemInfo.catePropValue3" :placeholder="'选择'+secondItem.propName3" style="width: 100%;">
                                                <template v-for="(item, index) in (secondItem.propOptionValue3).split(',')">
                                                    <Option :value="item" :key="index">{{item}}</Option>
                                                </template>
                                            </Select>
                                        </template>
                                        <template v-if="secondItem.propInputType3==5">
                                            <DatePicker v-model="itemInfo.catePropValue3" type="date" placeholder="请选择时间" style="width: 100%;"></DatePicker>
                                        </template>
                                        <template v-if="secondItem.propInputType3==6">
                                            <DatePicker v-model="itemInfo.catePropValue3" type="datetime" placeholder="请选择时间" style="width: 100%;"></DatePicker>
                                        </template>
                                    </td>
                                </tr>
                            </template>

                            <template v-if="!!secondItem.propName4">
                                <tr>
                                    <td class="label">
                                        <template v-if="secondItem.propMustInput4==1">
                                            <span class="request">*</span>
                                        </template>
                                        {{secondItem.propName4}}</td>
                                    <td>
                                        <template v-if="secondItem.propInputType4==0">
                                            <Input v-model="itemInfo.catePropValue4" :placeholder="'请输入'+secondItem.propName4" style="width: 100%" />
                                        </template>
                                        <template v-if="secondItem.propInputType4==1">
                                            <Input v-model="itemInfo.catePropValue4" type="textarea" :row="4" :placeholder="'请输入'+secondItem.propName4" style="width: 100%" />
                                        </template>
                                        <template v-if="secondItem.propInputType4==2">
                                            <RadioGroup v-model="itemInfo.catePropValue4">
                                                <template v-for="(item, index) in (secondItem.propOptionValue4).split(',')">
                                                    <Radio :label="item" :key="index">{{item}}</Radio>
                                                </template>
                                            </RadioGroup>
                                        </template>
                                        <template v-if="secondItem.propInputType4==3">
                                            <CheckboxGroup v-model="itemInfo.catePropValue4">
                                                <template v-for="(item, index) in (secondItem.propOptionValue4).split(',')">
                                                    <Checkbox :label="item" :key="index">{{item}}</Checkbox>
                                                </template>
                                            </CheckboxGroup>
                                        </template>
                                        <template v-if="secondItem.propInputType4==4">
                                            <Select v-model="itemInfo.catePropValue4" :placeholder="'选择'+secondItem.propName4" style="width: 100%;">
                                                <template v-for="(item, index) in (secondItem.propOptionValue4).split(',')">
                                                    <Option :value="item" :key="index">{{item}}</Option>
                                                </template>
                                            </Select>
                                        </template>
                                        <template v-if="secondItem.propInputType4==5">
                                            <DatePicker v-model="itemInfo.catePropValue4" type="date" placeholder="请选择时间" style="width: 100%;"></DatePicker>
                                        </template>
                                        <template v-if="secondItem.propInputType4==6">
                                            <DatePicker v-model="itemInfo.catePropValue4" type="datetime" placeholder="请选择时间" style="width: 100%;"></DatePicker>
                                        </template>
                                    </td>
                                </tr>
                            </template>

                        </template>
                        <tr>
                            <td class="label"><span class="request">*</span>捡拾地点</td>
                            <td>
                                <template>
                                    <Select v-model="itemInfo.areaCode" @on-change="getLostAreaList" placeholder="选择捡拾地点" style="width: 30%;">
                                        <template v-for="(item, index) in commonAreaCode">
                                            <Option :value="item.name" :key="index">{{item.name}}</Option>
                                        </template>
                                    </Select>
                                    <Select v-model="itemInfo.locationId" placeholder="选择捡拾地点" style="width: 30%;">
                                        <template v-for="(item, index) in areaCodeList">
                                            <Option :value="item.id" :key="index">{{item.locationName}}</Option>
                                        </template>
                                    </Select>
                                    <Input v-model="itemInfo.detailAreaDesc" placeholder="请输入详细捡拾地址" style="width: 40%" />
                                </template>
                            </td>
                        </tr>
                        <template v-if="itemInfo.areaCode=='客机舱'">
                        <tr>
                            <td class="label">航班号</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.airlineNo" placeholder="请输入航班号" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        </template>
                        <tr>
                            <td class="label">库存位置</td>
                            <td>
                                <template>
                                    <Select v-model="itemInfo.warehouseSpaceIds" filterable>
                                        <Option v-for="item in shelfSpaceList" :value="item.shelfCode" :key="item.shelfCode">{{ item.shelfCode }} ({{item.warehouseName}}/{{item.spaceName}}/{{item.shelfName}})</Option>
                                    </Select>
                                </template>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="label">是否确认公布</td>
                            <td>
                                <template>
                                    <RadioGroup v-model="itemInfo.showFlag">
                                        <Radio :label="1">是</Radio>
                                        <Radio :label="0">否</Radio>
                                    </RadioGroup>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">是否过安检</td>
                            <td>
                                <template>
                                    <RadioGroup v-model="itemInfo.checkFlag">
                                        <Radio :label="1">是</Radio>
                                        <Radio :label="0">否</Radio>
                                    </RadioGroup>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">是否发布到民航统一失物平台</td>
                            <td>
                                <template>
                                    <RadioGroup v-model="itemInfo.publicFlag">
                                        <Radio :label="1">是</Radio>
                                        <Radio :label="0">否</Radio>
                                    </RadioGroup>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">是否含现金</td>
                            <td>
                                <template>
                                    <RadioGroup v-model="itemInfo.cashFlag">
                                        <Radio :label="1">是</Radio>
                                        <Radio :label="0">否</Radio>
                                    </RadioGroup>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">是否有违禁品</td>
                            <td>
                                <template>
                                    <RadioGroup v-model="itemInfo.illegalFlag">
                                        <Radio :label="1">是</Radio>
                                        <Radio :label="0">否</Radio>
                                    </RadioGroup>
                                </template>
                            </td>
                        </tr>
                        <template v-if="itemInfo.illegalFlag==1">
                            <tr>
                                <td class="label">违禁物品信息描述</td>
                                <td>
                                    <template>
                                        <Input v-model="itemInfo.illegalDesc" placeholder="请输入违禁物品信息描述号" style="width: 100%" />
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </table>
                </div>
                </div>

                <template v-if="!!itemInfo.id">
                <div style="padding: 10px;">
                <div class="modalTitle">失物联系处理：</div>
                <div class="detail">
                    <table>
                        <tr>
                            <td class="label">旅客姓名</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.ownerName" placeholder="请输入旅客姓名" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">旅客电话</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.ownerPhone" placeholder="请输入旅客电话" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label" style="width: 250px;">客户联系时间</td>
                            <td style="width: 40%;">
                                <DatePicker v-model="itemInfo.ownerContactTime" type="datetime" placeholder="请选择客户联系时间" style="width: 100%;"></DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">旅客地址</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.ownerAddress" placeholder="请输入旅客地址" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">旅客证件类型</td>
                            <td>
                                <template>
                                    <Select v-model="itemInfo.ownerCertType" placeholder="选择旅客证件类型" style="width: 100%;">
                                        <template v-for="(item, index) in $config.ownerCertType">
                                            <Option :value="item.id" :key="index">{{item.name}}</Option>
                                        </template>
                                    </Select>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">旅客证件号</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.ownerCertNo" placeholder="请输入旅客证件号" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">联系来源</td>
                            <td>
                                <template>
                                    <Select v-model="itemInfo.ownerFromType" placeholder="选择联系来源" style="width: 100%;">
                                        <template v-for="(item, index) in $config.ownerFromType">
                                            <template v-if="index>0">
                                            <Option :value="item.id" :key="index">{{item.name}}</Option>
                                            </template>
                                        </template>
                                    </Select>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label vt">联系详情</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.dealRemark" type="textarea" :rows="2" placeholder="请输入补充信息" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                    </table>
                </div>
                </div>
                </template>

                <div style="padding: 10px;">
                <div class="modalTitle">捡拾信息：</div>
                <div class="detail">
                    <table>
                        <tr>
                            <td class="label" style="width: 250px;">交件人姓名</td>
                            <td style="width: 40%;"><Input v-model="itemInfo.handInUserName" placeholder="请输入交件人姓名" style="width: 100%" /></td>
                        </tr>
                        <tr>
                            <td class="label">交件人单位</td>
                            <td>
                                <template>
                                    <Select v-model="itemInfo.handInDeptId" placeholder="选择交件人单位" style="width: 100%;">
                                        <template v-for="(item, index) in deptList">
                                            <Option :value="item.id" :key="index">{{item.deptName}}</Option>
                                        </template>
                                    </Select>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">交件人电话</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.handInUserPhone" placeholder="请输入交件人电话" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">捡拾人姓名</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.pickupPeople" placeholder="请输入捡拾人姓名" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">捡拾人手机</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.pickupPhone" placeholder="请输入捡拾人手机" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">捡拾时间</td>
                            <td>
                                <template>
                                    <DatePicker v-model="itemInfo.pickupTime" type="datetime" placeholder="请选择捡拾时间" style="width: 100%;"></DatePicker>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">捡拾上报单位</td>
                            <td>
                                <template>
                                    <Select v-model="itemInfo.pickupRegDeptId" placeholder="选择捡拾上报单位" style="width: 100%;">
                                        <template v-for="(item, index) in deptList">
                                            <Option :value="item.id" :key="index">{{item.deptName}}</Option>
                                        </template>
                                    </Select>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">捡拾上报时间</td>
                            <td>
                                <template>
                                    <DatePicker v-model="itemInfo.pickupRegTime" type="datetime" placeholder="请选择上报时间" style="width: 100%;"></DatePicker>
                                </template>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="label">接收时间</td>
                            <td>
                                <template>
                                    <DatePicker v-model="itemInfo.receiveTime" type="datetime" placeholder="请选择接收时间" style="width: 100%;"></DatePicker>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">接收人姓名</td>
                            <td>
                                {{userInfo.userName}}
                            </td>
                        </tr>
                    </table>
                </div>
                </div>

                <div style="padding: 10px;">
                <div class="modalTitle">失物补充信息：</div>
                <div class="detail">
                    <table>
                        <tr>
                            <td class="label vt" style="width: 100px;">补充信息</td>
                            <td style="width: 80%;"><Input v-model="itemInfo.lostItemRemark" type="textarea" :rows="8" placeholder="请输入补充信息" style="width: 100%" /></td>
                        </tr>
                    </table>
                </div>
                </div>

                <div style="padding: 10px;">
                <div class="modalTitle">失物照片：</div>
                <div class="detail">
                    <table>
                        <tr>
                            <td class="label vt" style="width: 100px;"><span class="request">*</span>外观</td>
                            <td style="width: 80%;">
                                <div>
                                    <Row>
                                        <Col span="16"><p style="padding-top: 5px;"><input name="photo" ref="lostItemOfficialPic1" id="lostItemOfficialPic1" type="file"></p></Col>
                                        <Col span="8">
                                            <p style="padding-top: 3px;">
                                                <template v-if="!!itemInfo.lostItemOfficialPic1">
                                                    <Button size="small" type="error" @click="deleteFile('lostItemOfficialPic1')">删除</Button>
                                                </template>
                                                <template v-else>
                                                    <Button size="small" @click="uploadFileAction('lostItemOfficialPic1')">上传</Button>
                                                </template>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                                <div v-if="!!itemInfo.lostItemOfficialPic1">
                                    <img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.lostItemOfficialPic1.indexOf(',')!=-1?itemInfo.lostItemOfficialPic1.split(',')[1]:itemInfo.lostItemOfficialPic1)"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="label vt" style="width: 100px;"><span class="request">*</span>详细1</td>
                            <td style="width: 80%;">
                                <div>
                                    <Row>
                                        <Col span="16"><p style="padding-top: 5px;"><input name="photo" ref="lostItemOfficialPic2" id="lostItemOfficialPic2" type="file"></p></Col>
                                        <Col span="8">
                                            <p style="padding-top: 3px;">
                                                <template v-if="!!itemInfo.lostItemOfficialPic2">
                                                    <Button size="small" type="error" @click="deleteFile('lostItemOfficialPic2')">删除</Button>
                                                </template>
                                                <template v-else>
                                                    <Button size="small" @click="uploadFileAction('lostItemOfficialPic2')">上传</Button>
                                                </template>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                                <div v-if="!!itemInfo.lostItemOfficialPic2">
                                    <img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.lostItemOfficialPic2.indexOf(',')!=-1?itemInfo.lostItemOfficialPic2.split(',')[1]:itemInfo.lostItemOfficialPic2)"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="label vt" style="width: 100px;">详细2</td>
                            <td style="width: 80%;">
                                <div>
                                    <Row>
                                        <Col span="16"><p style="padding-top: 5px;"><input name="photo" ref="lostItemOfficialPic3" id="lostItemOfficialPic3" type="file"></p></Col>
                                        <Col span="8">
                                            <p style="padding-top: 3px;">
                                                <template v-if="!!itemInfo.lostItemOfficialPic3">
                                                    <Button size="small" type="error" @click="deleteFile('lostItemOfficialPic3')">删除</Button>
                                                </template>
                                                <template v-else>
                                                    <Button size="small" @click="uploadFileAction('lostItemOfficialPic3')">上传</Button>
                                                </template>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                                <div v-if="!!itemInfo.lostItemOfficialPic3">
                                    <img :src="$config.hostName+'/lostFound/'+(itemInfo.lostItemOfficialPic3.indexOf(',')!=-1?itemInfo.lostItemOfficialPic3.split(',')[1]:itemInfo.lostItemOfficialPic3)"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="label vt" style="width: 100px;">详细3</td>
                            <td style="width: 80%;">
                                <div>
                                    <Row>
                                        <Col span="16"><p style="padding-top: 5px;"><input name="photo" ref="lostItemOfficialPic4" id="lostItemOfficialPic4" type="file"></p></Col>
                                        <Col span="8">
                                            <p style="padding-top: 3px;">
                                                <template v-if="!!itemInfo.lostItemOfficialPic4">
                                                    <Button size="small" type="error" @click="deleteFile('lostItemOfficialPic4')">删除</Button>
                                                </template>
                                                <template v-else>
                                                    <Button size="small" @click="uploadFileAction('lostItemOfficialPic4')">上传</Button>
                                                </template>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                                <div v-if="!!itemInfo.lostItemOfficialPic4">
                                    <img :src="$config.hostName+'/lostFound/'+(itemInfo.lostItemOfficialPic4.indexOf(',')!=-1?itemInfo.lostItemOfficialPic4.split(',')[1]:itemInfo.lostItemOfficialPic4)"/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                </div>

            </div>
            <div slot="footer" class="modalFooter">
                <template>
                    <Button type="default" @click="closeAction" style="margin-right: 5px">关闭</Button>
                    <Button type="primary" @click="saveLostItem" :disabled="disable">提交</Button>
                </template>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "lostItemEdit",
    props: {
        itemInfo: Object,
        closeModal: Function,
        reflesh: Function,
    },
    components: { },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        disable: false,
        cateLevel: 1,
        paraCateId: 0,
        cate1: [],
        cate2: [],
        areaCodeList: [],
        deptList: [],
        secondItem: null,
        secondInfo: "",
        shelfSpaceList: [],
        commonAreaCode: [],
    }),
    watch: {
        "itemInfo.firstCateId": function(value) {
            var self = this;
            self.getLostCategoryList(2);
        }
    },
    methods: {
        closeAction() {
            var self = this;
            if(self.closeModal) {
                self.closeModal();
            }
        },
        secondItemChange(e) {
            var self = this;
            self.secondItem = JSON.parse(e);
            self.itemInfo.secondCateId = self.secondItem.id;
            self.itemInfo.catePropName1 = self.secondItem.propName1;
            self.itemInfo.catePropName2 = self.secondItem.propName2;
            self.itemInfo.catePropName3 = self.secondItem.propName3;
            self.itemInfo.catePropName4 = self.secondItem.propName4;
        },
        // 获取类型列表
        getLostCategoryList(cateLevel){
            var self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.getLostCategoryList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 10000,
                    "companyId": self.userInfo.companyId,
                    "paraCateId": cateLevel==2?self.itemInfo.firstCateId:0,
                    "cateLevel": cateLevel,
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self["cate"+cateLevel] = res.data.data;
                    if(cateLevel==1 && self["cate"+cateLevel].length>0) {
                        if(!self.itemInfo.id) {
                            self.itemInfo.firstCateId = self["cate"+cateLevel][0]["id"];
                        } else {
                            self.getLostCategoryList(2);
                        }
                    } else if(cateLevel==2) {
                        self["cate"+cateLevel].forEach((item)=>{
                            if(item.id == self.itemInfo.secondCateId) {
                                self.secondInfo = JSON.stringify(item);
                                self.secondItemChange(JSON.stringify(item));
                            }
                        });
                    }
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
                self.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                self.isLoading = false;
            });
        },
        formatTime(time) {
            var self = this;
            var timeInfo = self.$utility.getCurrentTimeInfo(time);
            return timeInfo.year + "-" + timeInfo.month + "-" + timeInfo.date + " " + timeInfo.hour + ":"+ timeInfo.min + ":"+ timeInfo.second;
        },
        // 保存失物
        saveLostItem() {
            var self = this;
            if(self.itemInfo.lostTitle.length==0) {
                self.$Message.error("请输入失物名称");
                return;
            }
            if(self.itemInfo.lostAmount.length==0) {
                self.$Message.error("请输入失物数量");
                return;
            }
            if(self.itemInfo.firstCateId === "") {
                self.$Message.error("请选择一级分类");
                return;
            }
            if(self.itemInfo.secondCateId === "") {
                self.$Message.error("请选择二级分类");
                return;
            }

            // if(self.itemInfo.pickupPeople.length==0) {
            //     self.$Message.error("请输入捡拾人姓名");
            //     return;
            // }
            // if(self.itemInfo.pickupPhone.length==0) {
            //     self.$Message.error("请输入捡拾人手机");
            //     return;
            // }

            self.disable = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.saveLostItem,
                data: self.$qs.stringify({
                    id: self.itemInfo.id || 0,
                    companyId: self.userInfo.companyId,
                    firstCateId: self.itemInfo.firstCateId||"", //一级分类ID，可不填
                    secondCateId: self.itemInfo.secondCateId||"", // 二级分类ID，新增时必填
                    lostTitle: self.itemInfo.lostTitle||"", // 失物名称，新增时必填，修改时可不填。比如单独修改失物状态时即可不用传入
                    pickupRegDeptId: self.itemInfo.pickupRegDeptId||"", // 捡拾人姓名，新增时必填，修改时可不填
                    pickupPeople: self.itemInfo.pickupPeople||"", // 捡拾人姓名，新增时必填，修改时可不填
                    pickupPhone: self.itemInfo.pickupPhone||"", // 捡拾人电话，新增时必填，修改时可不填
                    pickupRegUserId: self.itemInfo.pickupRegUserId||"", // 当是工作人员的前端H5/小程序的失物入口功能界面时，必须传入当前操作用户的用户id
                    pickupRegAppearancePic: self.itemInfo.pickupRegAppearancePic||"", // 捡拾时失物外观照片，传入“附件上传接口”返回的相对url地
                    pickupTime: !!self.itemInfo.pickupTime?self.formatTime(self.itemInfo.pickupTime):"", // 捡拾日期，yyyy-MM-dd如2020-08-02
                    pickupRegTime: !!self.itemInfo.pickupRegTime?self.formatTime(self.itemInfo.pickupRegTime):"", // 捡拾上报时间，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
                    areaCode: self.itemInfo.areaCode||"", // 机场区域，固定值：T1 T2 客机舱 地面交通
                    locationId: self.itemInfo.locationId||"", // 遗失位置id，从“获取失物位置列表”接口获取
                    airlineNo: self.itemInfo.airlineNo||"", // 航班号
                    lostAmount: self.itemInfo.lostAmount||"", //  失物数量
                    detailAreaDesc: self.itemInfo.detailAreaDesc||"", // 详细捡拾地址
                    receiveTime: !!self.itemInfo.receiveTime?self.formatTime(self.itemInfo.receiveTime):"", //  失物接收时间，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
                    handInDeptId: self.itemInfo.handInDeptId||"", // 交件人部门ID
                    handInUserName: self.itemInfo.handInUserName||"", // 失物交件人姓名，如可能是其他旅客
                    handInUserPhone: self.itemInfo.handInUserPhone||"", // 失物交件人电话，如可能是其他旅客
                    checkFlag: self.itemInfo.checkFlag||"", // 是否经过安检： 0=否 1=是
                    showFlag: self.itemInfo.showFlag||"", //  是否公示： 0=否 1=是
                    lostItemStatus: self.itemInfo.lostItemStatus||"", // 失物状态
                    useStatus: self.itemInfo.useStatus||"", // 物品使用状态
                    alertFlag: self.itemInfo.alertFlag||"", // 有自动匹配结果时是否提醒
                    cashFlag: self.itemInfo.cashFlag||"", // 是否含现金
                    illegalFlag: self.itemInfo.illegalFlag||"", // 是否有违禁品
                    illegalDesc: self.itemInfo.illegalDesc||"", // 违禁物品信息描述
                    lostRegId: self.itemInfo.lostRegId||"", // 报失记录ID，当选择匹配的旅客报失记录时必填
                    catePropName1: self.itemInfo.catePropName1||"", // 失物所属二级分类的分类属性1的名称，新增时必填
                    catePropValue1: self.itemInfo.catePropValue1||"", // 失物所属二级分类的分类属性1的属性值，新增时必填
                    catePropName2: self.itemInfo.catePropName2||"", // 失物所属二级分类的分类属性2的名称，如分类属性的propMustInput2为1则强制必填
                    catePropValue2: self.itemInfo.catePropValue2||"", // 失物所属二级分类的分类属性2的属性值，如分类属性的propMustInput2为1则强制必填
                    catePropName3: self.itemInfo.catePropName3||"", // 失物所属二级分类的分类属性3的名称，如分类属性的propMustInput3为1则强制必填
                    catePropValue3: self.itemInfo.catePropValue3||"", // 失物所属二级分类的分类属性3的属性值，如分类属性的propMustInput3为1则强制必填
                    catePropName4: self.itemInfo.catePropName4||"", // 失物所属二级分类的分类属性4的名称，如分类属性的propMustInput4为1则强制必填
                    catePropValue4: self.itemInfo.catePropValue4||"", // 失物所属二级分类的分类属性4的属性值，如分类属性的propMustInput4为1则强制必填
                    ownerContactTime: !!self.itemInfo.ownerContactTime?self.formatTime(self.itemInfo.ownerContactTime):"", // 联系失主时间，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
                    ownerAddress: self.itemInfo.ownerAddress||"", //旅客地址
                    ownerName: self.itemInfo.ownerName||"", // 失主姓名，认领失物时必须填写
                    ownerPhone: self.itemInfo.ownerPhone||"", // 失主电话，认领失物时必须填写
                    ownerCertType: self.itemInfo.ownerCertType||"", // 失主证件类型，认领失物时必须填写
                    ownerCertNo: self.itemInfo.ownerCertNo||"", // 失主证件号，认领失物时必须填写
                    ownerFromType: self.itemInfo.ownerFromType||"", //失主信息来源
                    takeTime: !!self.itemInfo.takeTime?self.formatTime(self.itemInfo.takeTime):"", // 领走失物时间，领取失物时必须填写，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
                    takeType: self.itemInfo.takeType||"", //领取失物方式，认领失物时必须填写：
                    takeUserCertType: self.itemInfo.takeUserCertType||"", // 领取人证件类型，认领失物时必须填写：
                    takeUserCertNo: self.itemInfo.takeUserCertNo||"", //领取人证件号，领取失物时必须填写
                    takeUserPhone: self.itemInfo.takeUserPhone||"", // 领取人电话，领取失物时必须填写
                    takeUserName: self.itemInfo.takeUserName||"", //领取人姓名，领取失物时必须填写
                    takeUserCertPhoto1: self.itemInfo.takeUserCertPhoto1||"", //领取人证件正面照片，领取时必填，传入“附件上传接口”返回的相对url地址
                    takeUserCertPhoto2: self.itemInfo.takeUserCertPhoto2||"", //领取人证件背面照片，领取时必填，传入“附件上传接口”返回的相对url地址
                    takeSignPhoto: self.itemInfo.takeSignPhoto||"", //领取签名照片，领取时必填，传入“附件上传接口”返回的相对url地址
                    deliveryCompanyId: self.itemInfo.deliveryCompanyId||"", //快递公司ID 0：无 1：顺丰 2：EMS
                    deliveryNo: self.itemInfo.deliveryNo||"", //快递单号
                    authorizationCertPhoto: self.itemInfo.authorizationCertPhoto||"", // 他人代领的失主授权文件电子版，当takeType不为1时，领取时必填
                    lostItemRemark: self.itemInfo.lostItemRemark||"", //失物备注信息
                    dealRemark: self.itemInfo.dealRemark||"", // 失物处理备注
                    lostItemOfficialPic1: !!self.itemInfo.lostItemOfficialPic1?self.itemInfo.lostItemOfficialPic1.split(',')[1]:"", //失物正面外观图片, 传入“附件上传接口”返回的相对url地址
                    lostItemOfficialPic2: !!self.itemInfo.lostItemOfficialPic2?self.itemInfo.lostItemOfficialPic2.split(',')[1]:"", //失物背面外观图片, 传入“附件上传接口”返回的相对url地址
                    lostItemOfficialPic3: !!self.itemInfo.lostItemOfficialPic3?self.itemInfo.lostItemOfficialPic3.split(',')[1]:"", //失物内包装图片, 传入“附件上传接口”返回的相对url地址
                    lostItemOfficialPic4: !!self.itemInfo.lostItemOfficialPic4?self.itemInfo.lostItemOfficialPic4.split(',')[1]:"", //失物其他图片, 传入“附件上传接口”返回的相对url地址
                    warehouseSpaceIds: self.itemInfo.warehouseSpaceIds||"", //失物库存位置ids，多个以英文逗号分隔，入库时必填
                    createUserId: self.userInfo["id"], // 创建用户ID，新增时必传
                    modifyUserId: self.userInfo["id"], // 修改用户ID，修改时必传
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.$Message.success("保存成功");
                    self.isDetail = false;
                    if(self.reflesh) {
                        self.reflesh(false);
                    }
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
                self.disable = false;
            })
            .catch(function (error) {
                console.log(error);
                self.disable = false;
            });
        },

        // 遗失位置
        getLostAreaList(){
            var self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.getLostAreaList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 1000,
                    "companyId": self.userInfo.companyId,
                    "areaCode": self.itemInfo.areaCode
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.areaCodeList = res.data.data;
                    
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        getDeptList(){
            var self = this;
    
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.deptService),
                url: self.$config.action.getDeptList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 100,
                    "companyId": self.userInfo.companyId,
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.deptList = res.data.data;
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
		
		// 上传文件
        uploadFileAction(id){
            let self = this;
            var fileList = document.getElementById(id).files;
            let formdataList = [];
            self["itemInfo"][id] = [];

            formdataList.push(new FormData());// 创建form对象
            formdataList[0].append('photo',fileList[0], fileList[0].name);// 通过append向form对象添加数据,可以通过append继续添加数据 
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.uploadService,'multipart/form-data'),
                url: self.$config.hostName+self.$config.service.uploadService+'?createUserId='+self.userInfo['id']+'&userId='+self.userInfo['id']+'&userToken='+self.userInfo['userToken']+'&fileType=lostItem'+'&companyId='+ self.userInfo.companyId,
                data: formdataList[0]
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.$Message.success("上传成功");
                    self["itemInfo"][id] = res.data.message;
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        // 删除附件
        deleteFile(id){
            let self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.attachmentService),
                url: self.$config.action.delAttachment,
                data: self.$qs.stringify({
                    "ids": parseInt(self["itemInfo"][id].split(',')[0]),
                    "modifyUserId": self.userInfo["id"],
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.$Message.success("删除成功");
                    self["itemInfo"][id] = "";
                    document.getElementById(id).value = "";
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
                self.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                self.isLoading = false;
            });
        },

		// 获取货架位置
		getLostWarehouseShelfSpaceList() {
			let self = this;
			self.axios({
		        method: 'post',
		        headers: self.$utility.setHeader(self.$config.service.warehouseService),
		        url: self.$config.action.getLostWarehouseShelfSpaceList,
		        data: self.$qs.stringify({
		            "pageSize": 1,
		            "pageSize": 10000,
		        })
		    })
		    .then(function (res) {
		        if(res.data.code=='200') {
                    self.shelfSpaceList = res.data.data;
		        } else if(res.data.code=='9003') {} else {
		            self.$Message.error(res.data.message);
		        }
		        self.isLoading = false;
		    })
		    .catch(function (error) {
		        console.log(error);
		        self.isLoading = false;
		    });
        },
        // 区域
        getSysParaList(){
            var self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.sysParaService),
                url: self.$config.action.getSysParaList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 1000,
                    "name": "",
                    "type": "",
                    "cateCode": "commonAreaCode",
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.commonAreaCode = res.data.data;
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    created() {
        let self = this;
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");
        self.getLostCategoryList(1);
        self.getDeptList();
        self.getLostAreaList();
        self.getLostWarehouseShelfSpaceList();
        self.getSysParaList();
    },
    mounted() {
        let self = this;
        let resizeTime = null;
        let userTimeOut = null;
        window.onresize = function() {
            clearTimeout(resizeTime);
            resizeTime = setTimeout(function () {
                self.height = window.innerHeight;
            }, 500);
        };
    },
    beforeDestroy(){

    }
};
</script>

<style lang="less">
@import "~@/common/unit.less";
</style>
