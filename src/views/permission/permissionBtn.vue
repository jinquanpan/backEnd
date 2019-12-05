<template>
    <div class="premissionBtn">
        <el-button v-allowed="['admin']" type="primary">我是只有admin的时候才能显示</el-button>
        <br>
        <el-button v-allowed="['user']" type="info">我是只有user的时候才能显示</el-button>
        <br>
        <el-button v-allowed="['admin','user']" type="warning">我是admin或者user才能显示</el-button>
        <br>
        <el-button type="danger">任何角色都可以显示</el-button>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
    .premissionBtn{
        padding: 40px;
        button{
            margin-bottom: 20px
        }
    }
</style>
