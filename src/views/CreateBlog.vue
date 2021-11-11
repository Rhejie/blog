<template>
    <div class="col-md-8">
        <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Title" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="Subject" prop="subject">
                <el-input type="textarea" v-model="ruleForm.subject"></el-input>
            </el-form-item>
            <el-form-item label="Body" prop="body">
                <vue-editor v-model="ruleForm.body" :editorToolbar="customToolbar"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Publish</el-button>
                <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
    name: 'CreateBlog',
    components: {
        VueEditor
    },
    props: {
        userData: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            ruleForm: {
                user_id : '',
                title: '',
                body: '',
                subject: ''
            },
            rules: {
                title: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                ],
                subject: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                ],
                body: [
                    { required: true, message: 'Please input Content', trigger: 'blur' },
                ],
            },
            customToolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["code-block"]
            ]
        }
    },
    
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.store();
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        async store() {
            try {
                this.ruleForm.user_id = this.userData.id
                const res = await this.$API.Blog_api.store(this.ruleForm)
                this.$notify({
                    title: 'Success',
                    message: 'Successfully Published',
                    type: 'success'
                });
                this.$EventDispatcher.fire('ADD_NEW_BLOG', res.data);   
                this.resetForm('ruleForm')   
            } catch (error) {
                console.log(error);
            }
        }
    },
    watch: {
        userData(val) {
            if(val) {
                this.ruleForm.user_id = val.id
            }
        }
    }
}
</script>