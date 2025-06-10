module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: '@babel/eslint-parser'
    },
    plugins: [
        'vue'
    ],
    rules: {
        'vue/script-setup-uses-vars': 'error'
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    }
}
