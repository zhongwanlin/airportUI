<template>
    <div class="printWrap">
		<div id="printTemp">
			<div class="printBox">
				<div class="left">
					<!-- <img id="barcode" /> -->
					<div class="qrCode" ref="qrCodeDiv"></div>
				</div>
				<div class="right">
					<p>编号：{{lostItemCode}}</p>
					<p>日期：</p>
					<p>失主：</p>
					<p>电话：</p>
					<p>领取人：</p>
				</div>
			</div>
		</div>
		<div id="printRepeat"></div>
    </div>
</template>

<script>
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcodejs2';
export default {
    name: "print",
    props: {},
    components: { },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
		lostItemCode: ""
    }),
    methods: {
        
    },
    created() {
        let self = this;
    },
    mounted() {
        let self = this;
        let resizeTime = null;
        let userTimeOut = null;
		let queryInfo = self.$utility.getQueryParams();
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");
		self.lostItemCode = queryInfo.lostItemCode;
        window.onresize = function() {
            clearTimeout(resizeTime);
            resizeTime = setTimeout(function () {
                self.height = window.innerHeight;
            }, 500);
        };
		
		// JsBarcode("#barcode", self.lostItemCode, {
		// 	format: "CODE128", // 选择要使用的条形码类型
		// 	text: self.lostItemCode,
		// 	displayValue: false, //是否在条形码下方显示文字
		// 	textPosition: "bottom" //设置文本的垂直位置
		// });
		new QRCode(self.$refs.qrCodeDiv, {
		    text: self.lostItemCode,
		    width: 80,
		    height: 80,
		    colorDark: "#333333", //二维码颜色
		    colorLight: "#ffffff", //二维码背景色
		    correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
		});
		setTimeout(()=>{
			for (var i = 0; i < 10; i++) {
				self.$("#printRepeat").append(self.$("#printTemp").html());
			}
		}, 2000);
    },
    beforeDestroy(){
        clearInterval(window.recordTime);
    }
};
</script>

<style lang="less">
* {
	margin: 0;
	padding: 0;
}
body {
	background-color: #f8f8f8;
	overflow-y: auto;
}
.printWrap {
    width: 10cm;
	margin: 0 auto;
	padding: 20px 0;
	.printBox {
		width: 10cm;
		height: 4cm;
		background-color: #fff;
		margin: 10px;
		.left {
			float: left;
			width: 4cm;
			.qrCode {
				padding: 5px;
			}
			img {
				width: 100%;
			}
		}
		.right {
			float: left;
			width: 6cm;
			p {
				text-indent: 5px;
				font-size: 16px;
				padding: 2px 0;
			}
		}
	}
	
}
</style>
