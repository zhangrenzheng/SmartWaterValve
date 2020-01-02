# SmartWaterValve

## To do list

- [ ] URL/UserRegister  
	微信用户 openID  
	制作用户注册页面  

- [ ] URL/UserLogin  
	制作用户登录页面  

- [ ] URL/addDevice  
	制作添加设备页面  
	调用微信小程序二维码识别 API，读取一个数字字符串，保存至添加设备页面下的 js data 中  

- [x] URL/delDevice  
	删除设备  

- [x] URL/startAccessCtrl  
	获取管理员身份  
	制作输入管理员密码弹出框  

- [ ] URL/getAccessCtrl  
	获取用户控制权限  
	检测用户权限，如果没有权限弹出输入密码框以获取权限  

- [x] URL/setDeviceTeam  
	设备分组  

- [x] URL/UserDevices  
	获取用户设备列表  

- [x] URL/UserDevice  
	获取单个设备信息  

- [x] URL/OpenDeviceCtrl  
	阀门开关控制  

- [x] URL/OpenDegreeCtrl  
	阀门开度控制  

- [x] URL/setCtrlType  
	阀门控制方式：高字节 低字节  

- [x] URL/setAccuracy  
	阀门控制精度  

- [x] URL/UpdateDeviceName  
	修改设备名称和备注  

- [ ] URL/updateAccessCtrlPassword  
	修改控制密码  

- [ ] URL/DeviceHistoryInfo  
        获取某设备相关的运行历史
	
- [ ] URL/addAccessCtrlUsers  
        为某用户授权某设备的权限  
	
- [ ] URL/getAccessCtrlUsers  
        获取拥有某设备的账户列表及详情  
	
- [ ] URL/delAccessCtrlUsers  
        删除某用户对于某设备的所有权限  
