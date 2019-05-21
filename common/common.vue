<script type="text/javascript">
    // 定义一些公共的属性和方法http://192.168.0.199:8080
    const httpUrl = 'http://testadmin.xkegame.com'
    function commonFun() {
        console.log("公共方法")
    }
    // 暴露出这些属性和方法
    export default {
        httpUrl,
        commonFun
    }
</script>