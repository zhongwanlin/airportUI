<template>
    <div>
        <div style="padding: 0 0 5px 0;">
            <Button type="primary" size="small" @click="showNewOrEdit">+录入货架位置</Button>
        </div>

        <div class="tableList">
            <template>
                <Table stripe border :loading="isLoading" :columns="columns" :data="dataList">
					<template slot-scope="{ row, index }" slot="spaceCode">
						<div class="barcodeTxt" @click="showBarcode(row)">{{row.spaceCode}}</div>
					</template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" class="info" size="small" @click="showNewOrEdit(row)">修改</Button>
                        <Button type="text" class="error" size="small" @click="delLostWarehouseShelfSpace(row)">删除</Button>
                    </template>
                </Table>
            </template>
        </div>
		
        <div class="pageWrap subPageWrap">
            <template>
                <Page :total="count" @on-change="pageSizeChange" size="small" @on-page-size-change="pageRowChange" showTotal />
            </template>
        </div>

        <template>
            <Modal v-model="isDetail" class="noContentPadding" :mask-closable="false" width="40" :styles="{top: '10%'}" title="货架位置录入" @on-cancel="isDetail=false">
                <div class="modalTable">
                    <div class="detail">
                        <table>
							<template v-if="!!itemInfo.id">
							   <tr>
									<td class="label" style="width: 180px;"><span class="request">*</span>位置编码</td>
									<td style="width: 30%;">
										{{itemInfo.spaceCode}}
									</td>
								</tr>
							</template>
                            <tr>
                                <td class="label"><span class="request">*</span>位置名称</td>
                                <td><Input v-model="itemInfo.spaceName" placeholder="请输入位置名称" style="width: 100%" /></td>
                            </tr>
                            <tr>
                                <td class="label"><span class="request">*</span>最多存放失物个数</td>
                                <td>
                                    <InputNumber v-model="itemInfo.maxItemNum" :min="0"  placeholder="请输入最多存放失物个数"  style="width: 100%;"></InputNumber>
                                </td>
                            </tr>
                            <tr>
                                <td class="label"><span class="request">*</span>是否可用</td>
                                <td>
                                    <template>
                                        <Select v-model="itemInfo.freeFlag" clearable placeholder="选择是否可用" style="width: 100%;">
                                            <Option :value="1">是</Option>
                                            <Option :value="0">否</Option>
                                        </Select>
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td class="label vt">位置描述</td>
                                <td><Input v-model="itemInfo.spaceDesc" type="textarea" :row="8" placeholder="请输入位置描述" style="width: 100%" /></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div slot="footer" class="modalFooter">
                    <template>
                        <Button type="default" @click="isDetail=false" style="margin-right: 5px">关闭</Button>
                        <Button type="primary" @click="saveLostWarehouseShelfSpace" :disabled="disable">提交</Button>
                    </template>
                </div>
            </Modal>
        </template>
		
		<template>
		    <Modal v-model="isBarcode" class="noContentPadding" :footer-hide="true" :mask-closable="false" width="40" :styles="{top: '10%'}" title="货架位置条形码" @on-cancel="isDetail=false">
		        <div class="modalTable">
		            <div class="detail" style="text-align: center;">
		                <img id="barcode" style="width: 100%;" />
		            </div>
		        </div>
		    </Modal>
		</template>
		
    </div>
</template>

<script>
import JsBarcode from 'jsbarcode';
export default {
    name: "shelfSpace",
    props: {
        parentItem: Object
    },
    components: { },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        isLoading: false,
        isDetail: false,
		isBarcode: false,
        disable: false,
        count: 0,
        pageInfo: {
            pageIndex: 1,
            pageSize: 20,
        },
        searchInfo: {
            spaceCode: "", //货架上位置编码
            spaceName: "", //货架上位置名称
        },
        itemInfo: {
            spaceCode: "", //货架上位置编码
            spaceName: "", //货架上位置名称
            spaceDesc: "", //仓库描述
            maxItemNum: 1, //最多存放失物个数，默认为1
            freeFlag: "", //是否可用
        },
        columns: [
            {
                title: "序号",
                align: "center",
                type: "index",
                width: 60
            },
            {
                title: "位置编码",
                align: "center",
                key: "spaceCode",
                slot: "spaceCode",
            },
            {
                title: "位置名称",
                align: "center",
                key: "spaceName"
            },
            {
                title: "存放失物个数",
                align: "center",
                key: "maxItemNum"
            },
            {
                title: "是否可用",
                align: "center",
                key: "freeFlag",
                render: function (h, params) {
                    return h("span", params.row.freeFlag==0?'否':'是');
                }
            },
            {
                title: "修改时间",
                align: "center",
                key: "createTime",
                width: 160
            },
            {
                title: "操作",
                align: "center",
                slot: 'action'
            }
        ],
        dataList: [],
    }),
    methods: {
        reflesh(){
            var self = this;
            self.getLostWarehouseShelfSpaceList(true);
        },
        pageSizeChange(value) {
            var self = this;
            self.pageInfo.pageIndex = parseInt(value, 10);
            self.getLostWarehouseShelfSpaceList(true);
        },
        pageRowChange(value) {
            var self = this;
            self.pageInfo.pageSize = parseInt(value, 10);
            self.getLostWarehouseShelfSpaceList(false);
        },
        getLostWarehouseShelfSpaceList(bool){
            var self = this;
            if (bool == true) {
                self.isLoading = true;
                self.pageInfo.pageIndex = 0;
            }
            console.log(self.parentItem);
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.getLostWarehouseShelfSpaceList,
                data: self.$qs.stringify({
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "companyId": self.parentItem.companyId,
                    "warehouseId": self.parentItem.warehouseId,
                    "warehouseShelfId": self.parentItem.id,
                    "shelfCode": self.parentItem.shelfCode,
                    "shelfName": self.parentItem.shelfName,
                    "spaceCode": self.searchInfo.spaceCode,
                    "spaceName": self.searchInfo.spaceName,
                    "freeFlag": self.searchInfo.freeFlag,
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.dataList = res.data.data;
                    self.count = res.data.count;
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
        // 新增或修改
        showNewOrEdit(item) {
            var self = this;
            if(typeof item != "undefined") {
                self.itemInfo = item;
            } else {
                self.itemInfo = {
                    spaceCode: "", //货架上位置编码
                    spaceName: "", //货架上位置名称
                    spaceDesc: "", //仓库描述
                    maxItemNum: 1, //最多存放失物个数，默认为1
                    freeFlag: "", //是否可用
                };
            }

            self.isDetail = true;
        },
        // 保存分类
        saveLostWarehouseShelfSpace() {
            var self = this;
            // if(self.itemInfo.spaceCode.length==0) {
            //     self.$Message.error("请输入位置编码");
            //     return;
            // }
            if(self.itemInfo.spaceName.length=="") {
                self.$Message.error("请输入位置名称");
                return;
            }
            if(self.itemInfo.maxItemNum == 0) {
                self.$Message.error("请输入存放个数");
                return;
            }
            if(self.itemInfo.freeFlag==="") {
                self.$Message.error("请选择是否可用");
                return;
            }
    
            self.disable = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.saveLostWarehouseShelfSpace,
                data: self.$qs.stringify({
                    id: self.itemInfo.id||0,
                    companyId: self.parentItem.companyId,
                    warehouseShelfId: self.parentItem.id,
                    spaceCode: 111, //货架上位置编码
                    spaceName: self.itemInfo.spaceName, //货架上位置名称
                    spaceDesc: self.itemInfo.spaceDesc, //仓库描述
                    maxItemNum: self.itemInfo.maxItemNum||1, //最多存放失物个数，默认为1
                    freeFlag: self.itemInfo.freeFlag, //是否可用
                    createUserId: self.userInfo["id"], // 创建用户ID，新增时必传
                    modifyUserId: self.userInfo["id"], // 修改用户ID，修改时必传
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.$Message.success("保存成功");
                    self.isDetail = false;
                    self.getLostWarehouseShelfSpaceList(true);
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
        // 删除分类
        delLostWarehouseShelfSpace(item) {
            var self = this;
            self.$Modal.confirm({
                title: '确认要删除位置'+item.spaceName+'吗？',
                content: '',
                onOk: () => {
                    self.axios({
                        method: 'post',
                        headers: self.$utility.setHeader(self.$config.service.cateService),
                        url: self.$config.action.delLostWarehouseShelfSpace,
                        data: self.$qs.stringify({
                            ids: [item.id].join(","),
                            modifyUserId: self.userInfo.id
                        })
                    })
                    .then(function (res) {
                        if(res.data.code=='200') {
                            self.$Message.success("删除成功");
                            self.getLostWarehouseShelfSpaceList(true);
                        } else if(res.data.code=='9003') {} else {
                            self.$Message.error(res.data.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            });
        },
		// 显示条形码
		showBarcode(item) {
			let self = this;
			self.isBarcode = true;
			JsBarcode("#barcode", item.spaceCode, {
				format: "CODE128", // 选择要使用的条形码类型
				text: item.spaceCode,
				displayValue: true, //是否在条形码下方显示文字
				textPosition: "bottom" //设置文本的垂直位置
			});
		}
    },
    created() {
        let self = this;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");

        self.getLostWarehouseShelfSpaceList(true);

        self.$watch('searchInfo', function () {
            clearTimeout(userTimeOut);
            userTimeOut = setTimeout(() => {
                self.getLostWarehouseShelfSpaceList(true);
            }, 200);
        }, {
            deep: true
        });
    },
    mounted() {
        let self = this;
        let resizeTime = null;
        window.onresize = function() {
            clearTimeout(resizeTime);
            resizeTime = setTimeout(function () {
                self.height = window.innerHeight;
            }, 500);
        };
    },
    beforeDestroy(){
        clearInterval(window.recordTime);
    }
};
</script>

<style lang="less">
@import "~@/common/unit.less";
.barcodeTxt {
    cursor: pointer;
    color: blue;
}
</style>
