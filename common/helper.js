const myUrl=new Array()
myUrl[0]="http://admin.xkegame.com"
myUrl[1]="http://testadmin.xkegame.com"

myUrl[2]="http://192.168.0.199:8081"

const environment=new Array()
environment[0]='http://h5.xkegame.com'
environment[1]='http://test.xkegame.com'


//数据连接   1测试  0 正式
const websiteUrl =	  myUrl[0]
const webtoUrl =environment[0];



export default {
    websiteUrl,
	webtoUrl
}