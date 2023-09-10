<template>
    <client-only>
        <tiny-mce 
        class="tinymce-editor"
        v-model="newValue"
          :init="{
            height: getEditorHeight,
            skin: false,
            toolbar: 'undo redo | formatselect | bold italic backcolor forecolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | table | help',
            plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
                'mention'
            ],
            relative_urls : false,
            remove_script_host : false,
            convert_urls : true,
            content_css: false,
            setup : function(ed)
            {
                ed.on('init', function() 
                {
                    this.getDoc().body.style.fontFamily = 'Verdana';
                });
            },
            mentions: {
                queryBy: 'firstname',
                queryBy2: 'lastname',
                delimiter: ['@'],
                source: async function (query, process, delimiter) {
                    // Do your ajax call
                    // When using multiple delimiters you can alter the query depending on the delimiter used
                    if (delimiter === '@') {
                        const res = await $axios.get(`/${getOrgUID}/employees`, { params: { query } });
                        process(res.data.data);
                    }
                },
                insert: function(item) {
                    return `<span data-uid='${item.uid}' class='data-employee-popover-editor --text-dark py-0.5 px-2 text-xs bg-gray-200 rounded cursor-pointer font-semibold'>@${item.firstname.toLowerCase()}${item.lastname.toLowerCase()}</span> `;
                }
            }
          }"
          >
        </tiny-mce>
    </client-only>
</template>
<script>

if(process.client) {
    require('tinymce/tinymce');
    require('tinymce/plugins/link/plugin');
    require('tinymce/plugins/image/plugin');
    require('tinymce/plugins/advlist/plugin');
    require('tinymce/plugins/autolink/plugin');
    require('tinymce/plugins/lists/plugin');
    require('tinymce/plugins/charmap/plugin');
    require('tinymce/plugins/preview/plugin');
    require('tinymce/plugins/code/plugin');
    require('tinymce/plugins/anchor/plugin');
    require('tinymce/plugins/visualblocks/plugin');
    require('tinymce/plugins/fullscreen/plugin');
    require('tinymce/plugins/insertdatetime/plugin');
    require('tinymce/plugins/media/plugin');
    require('tinymce/plugins/table/plugin');
    require('tinymce/plugins/help/plugin');
    require('tinymce/plugins/wordcount/plugin');
    require('tinymce/plugins/searchreplace/plugin');
    require('tinymce/plugins/emoticons/plugin');
    require("~/plugins/tinymce-mention");
    require('tinymce-mention/css/autocomplete.css');
    require('tinymce-mention/css/rte-content.css');

    require('tinymce/themes/silver');
    require('tinymce/models/dom');
    require('tinymce/icons/default');
    require('tinymce/skins/ui/oxide/skin.min.css');
}

import Editor from '@tinymce/tinymce-vue'

export default {
    props: ['value', 'height'],
    components: {
        TinyMce: Editor
    },
    computed: {
        newValue: {
            get: function() {
                return this.value;
            },
            set: function(newValueData) {
                this.$emit('input', newValueData)
            }
        },
        getEditorHeight() {
            return !this.height ? 400 : this.height;
        }
    }
}
</script>
<style type="text/css">
.tox .tox-editor-header {
    z-index: 0!important;
}
</style>