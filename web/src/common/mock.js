const mock = (function (mock) {
    mock.demoInfo = {
        
        "CZ6783": {
            type: 1, // 出发
            zj: 0, // 值机
            aj: 0, // 安检
            id_card_no: "CZ67832760CHAK105", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ6783", //truestring飞机号
            destination: "HAK", //truestring出发地
            starting: "CAN", //truestring目的地
            departure_time: "18:00", //truestring起飞时间
            register_time: "17:35", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "211", // 登机口
            security_check: "A区", // 安检口
            checkIn_counter: "63-74" // 值机柜台
        },
        
        "CZ3100": {
            type: 1, // 出发
            zj: 1, // 值机
            aj: 1, // 安检
            id_card_no: "CZ310028735H283", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ3100", //truestring飞机号
            destination: "NAY", //truestring出发地
            starting: "CAN", //truestring目的地
            departure_time: "18:00", //truestring起飞时间
            register_time: "17:45", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "211", // 登机口
            security_check: "A区", // 安检口
            checkIn_counter: "F,G01-11" // 值机柜台
        },
        
        "CZ3464": {
            type: 2, // 到达
            ld: 0, // 落地
            id_card_no: "CZ34640349CLXA120", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ3464", //truestring飞机号
            starting: "LXA", //truestring出发地
            destination: "CAN", //truestring目的地
            departure_time: "13:00", //truestring起飞时间
            register_time: "12:30", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "A8", // 登机口
            security_check: "9", // 安检口
            checkIn_counter: "1-12" // 值机柜台
        },
        
        "CZ3490": {
            type: 2, // 到达
            ld: 1, // 落地
            id_card_no: "CZ34900937BKMG008", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ3490", //truestring飞机号
            starting: "KMG", //truestring出发地
            destination: "CAN", //truestring目的地
            departure_time: "22:00", //truestring起飞时间
            register_time: "21:35", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "22", // 登机口
            security_check: "9", // 安检口
            checkIn_counter: "D01-D20" // 值机柜台
        },
        
        "CZ3110": {
            type: 3, // 中转
            zj: 0, // 值机
            avatar: "",
            id_card_no: "CZ3110 22671D359", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ3110", //truestring飞机号
            starting: "CAN", //truestring出发地
            destination: "NAY", //truestring目的地
            departure_time: "19:00", //truestring起飞时间
            register_time: "18:45", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "21", // 登机口
            security_check: "9", // 安检口
            checkIn_counter: "F,G01-11" // 值机柜台
        },
        
        "CZ3532": {
            type: 3, // 中转
            zj: 1, // 值机
            avatar: "",
            id_card_no: "CZ3532260Z083K0256100", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ3532", //truestring飞机号
            starting: "CAN", //truestring出发地
            destination: "PVG", //truestring目的地
            departure_time: "13:20", //truestring起飞时间
            register_time: "13:10", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "59", // 登机口
            security_check: "34", // 安检口
            checkIn_counter: "D10-D21" // 值机柜台
        },
        
        "CZ3328": {
            type: 1, // 出发
            zj: 0, // 值机
            aj: 0, // 安检
            avatar: "",
            id_card_no: "CZ33283132BZHA032", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ3328", //truestring飞机号
            destination: "ZHA", //truestring出发地
            starting: "CAN", //truestring目的地
            departure_time: "14:00", //truestring起飞时间
            register_time: "13:45", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "4", // 登机口
            security_check: "22", // 安检口
            checkIn_counter: "3-5" // 值机柜台
        },
        
        "CZ3113": {
            type: 2, // 到达
            ld: 0, // 落地
            avatar: "",
            id_card_no: "CZ3113294H038H0063100", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ3113", //truestring飞机号
            starting: "NAY", //truestring出发地
            destination: "CAN", //truestring目的地
            departure_time: "16:35", //truestring起飞时间
            register_time: "16:20", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "B271", // 登机口
            security_check: "13", // 安检口
            checkIn_counter: "C,D,E,F,G" // 值机柜台
        },
        
        "CZ3574": {
            type: 3, // 中转
            zj: 0, // 值机
            avatar: "",
            id_card_no: "CZ35742346ATAO014", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ6783", //truestring飞机号
            starting: "CAN", //truestring出发地
            destination: "TAO", //truestring目的地
            departure_time: "20:00", //truestring起飞时间
            register_time: "19:40", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "12A", // 登机口
            security_check: "9", // 安检口
            checkIn_counter: "B" // 值机柜台
        },
        
        "9C8932": {
            type: 1, // 出发
            zj: 1, // 值机
            aj: 1, // 安检
            avatar: "",
            id_card_no: "9C8932344Y013C0106100", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "9C8932", //truestring飞机号
            starting: "CAN", //truestring出发地
            destination: "PVG", //truestring目的地
            departure_time: "21:00", //truestring起飞时间
            register_time: "20:50", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "12A", // 登机口
            security_check: "8", // 安检口
            checkIn_counter: "M21-M24" // 值机柜台
        },
        
        "CZ3337": {
            type: 2, // 到达
            ld: 1, // 落地
            avatar: "",
            id_card_no: "CZ33372333JCAN029", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "HUANGSHENGWEI", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ3337", //truestring飞机号
            starting: "CAN", //truestring出发地
            destination: "MXZ", //truestring目的地
            departure_time: "14:00", //truestring起飞时间
            register_time: "13:35", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "12A", // 登机口
            security_check: "8", // 安检口
            checkIn_counter: "C,D,E,F,G" // 值机柜台
        },
        
        "CZ3101": {
            type: 3, // 中转
            zj: 1, // 值机
            avatar: "",
            id_card_no: "CZ3101287Z066G0401147", //truestring身份证号码
            name: "HUANGSHENGWEI", //truestring名称
            phone: "CZ3101287Z066G0401147", //truestring手机号码
            airline: "南方航空", //truestring航空公司
            airline_num: "CZ3101", //truestring飞机号
            starting: "CAN", //truestring出发地
            destination: "NAY", //truestring目的地
            departure_time: "07:35", //truestring起飞时间
            register_time: "07:20", //truestring登机时间
            airplane_status: "正常", //truestring状态
            boarding_gate: "B154", // 登机口
            security_check: "12", // 安检口
            checkIn_counter: "C,D,E,F,G" // 值机柜台
        }
    };

    mock.demoMatch = ["CZ6783", "CZ3101", "CZ3100", "CZ3464", "CZ3490", "CZ3110", "CZ3532", "CZ3328", "CZ3113", "CZ3574", "9C8932", "CZ3337"];
    mock.demoList = ["6783", "3101", "3100", "3464", "3490", "3110", "CZ3532", "3328", "3113", "3574", "8932", "3337"];

    return mock;
}(mock || {}));

export default mock;