import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
        userInfo: {
            "userId":"",
            "userName":"",
            "realName":"",
            "sex":"",
            "phone":"",
            "lastLoginTime":"",
            "lastLoginIp":"",
            "isAdmin":"",
            "token":"",
            "status":"",
            "roleIds":"",
            "userRoles":[],
            "realEstateId":"",
            "realEstateInfo":{},
            "organizationInfo":{}
		},
        superUserInfo: {
            "userId":"",
            "userName":"",
            "realName":"",
            "sex":"",
            "phone":"",
            "lastLoginTime":"",
            "lastLoginIp":"",
            "isAdmin":"",
            "token":"",
            "status":"",
            "roleIds":"",
            "userRoles":[],
            "realEstateId":"",
            "realEstateInfo":{},
            "organizationInfo":{}
        },
        shareSearch: {
            "realName": "",
            "phone": "",
        },
        shareType: 0,
        sharePerson: {},
        newOwner: {},
        newShare: {},
        newAssetesInfo: {
            "realEstateId": "", // 楼盘ID
            "buildingNumId": "", // 楼号/街道ID
            "buildingUnitId": "", // 楼栋单元ID
            "floor": "", // 楼层
            "houseNo": "", // 房号
            "houseType": "", // 型号
            "apartmentLayout": "", // 户型
            "productType": "", // 产品类型
            "gardenArea": 0, // 花园面积
            "builtUpArea": 0, // 建筑面积
            "innerArea": 0, // 套内面积
            "publicRate": 0, // 公摊率
            "unitPrice": 0, // 面单价
            "totalPrice": 0, // 面总价单价
            "salesStatus": 4,
            "parkingLotIds": [], // 车位
            "storeroomIds": [], // 车位
            "customerId": "",
            "customerIdCard": "",
            "customerName": "",
            "customerPhone": "",
            "regionName": "",
            "parkingLotType": "",
            "parkingLotId": "",
            "parkingLotNo": ""
        },
        isApproval: false,
        productType: "",
        editableLoand: true,
        editableStages: true
	},
	mutations: {
        setUserInfo(state, userInfo){
			state.userInfo = userInfo;
		},
        setSuperUserInfo(state, superUserInfo){
			state.superUserInfo = superUserInfo;
        },
        setSharePerson(state, sharePerson) {
            state.sharePerson = sharePerson;
        },
        setShareSearch(state, shareSearch) {
            state.shareSearch = shareSearch;
        },
        setShareType(state, shareType) {
            state.shareType = shareType;
        },
        setNewOwner(state, newOwner) {
            state.newOwner = newOwner;
        },
        setNewShare(state, newShare) {
            state.newShare = newShare;
        },
        setNewAssetesInfo(state, newAssetesInfo){
            state.newAssetesInfo = newAssetesInfo;
        },
        setIsApproval(state, isApproval){
            state.isApproval = isApproval;
        },
        setProductType(state, productType){
            state.productType = productType;
        },
        setEditableLoand(state, editableLoand){
            state.editableLoand = editableLoand;
        },
        setEditableStages(state, editableStages){
            state.editableStages = editableStages;
        }
		
	}
})

export default store
