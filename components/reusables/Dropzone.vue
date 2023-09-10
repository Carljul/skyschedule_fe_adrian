<template>
    <div class="filezonewrap">

        <slot name="files" />

        <div v-if="open" :class="{
            filezone: true,
            pagemedia: ispage
        }">
            <div class="mediawrap">
                <button v-if="!ispage" type="button" class="mediaclose mt-3" @click="open=false">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="mediaheader">
                    <h4 class="mediatitle">
                        {{ getTitle }}
                    </h4>
                </div>

                <div class="mediamenu">
                    <button type="button" @click="ismedia=false" :class="{ active: ismedia }">Upload Files</button>
                    <button type="button" @click="ismedia=true" :class="{ active: !ismedia }">Media Library</button>
                </div>

                <div class="mediacontent">
                    <div class="mediaupload" v-if="!ismedia">
                        
                        <div class="file-area">
                            <input type="file" 
                            required="required" 
                            :multiple="multiple" 
                            @change="getFiles"
                            :accept="getMimes"
                            >
                            <div class="file-dummy">
                                <span>Click to select a File
                                    <span v-if="multiple">, or drag it here</span>
                                </span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="mediafiles" v-else>
                        <div class="mfiles">
                            <div class="mfilesheader">
                                <div class="flex items-center">
                                    <div class="filterdatemedia">
                                        Filter Media 

                                        <client-only>
                                            <t-select-dynamic 
                                            class="p-0"
                                            v-model="medias.filter.date"
                                            @input="e => { filterMedia({ date: medias.filter.date }); }"
                                            :endpoint="`${this.getApi}/dates`" 
                                            datakeylabel="date_key" 
                                            datakeyvalue="date_key"
                                            searchplaceholder="Search Date"
                                            placeholder="January 2022"
                                            ></t-select-dynamic>
                                        </client-only>
                                        
                                    </div>

                                </div>
                                <div style="width:250px;max-width:100%;">
                                    <form @submit.prevent="filterMedia">
                                        <input type="text" placeholder="Search" v-model="medias.filter.query" class="search-zone">
                                    </form>
                                </div>
                            </div>
                            <div class="mfileslists">
                                <ul class="attachments">
                                    <li v-for="(mm, mmi) in getMediaData" :key="`media-item-${mmi}`" 
                                    :class="{ 
                                        isicon: mm.isicon,
                                        isselected: mm.__selected
                                    }" 
                                    @click="selectedMedia(mm)">
                                        <img :src="mm.thumbl" />
                                        <div class="filename">
                                            {{ mm.file_name }}
                                        </div>
                                    </li>
                                </ul>

                                <div v-if="medias.loading" class="mfileloaderwrap">
                                    <div class="mfileloader"></div>
                                </div>

                                <div v-if="!medias.loading && !getMediaData.length" class="mfileloadmore">
                                    <p>There is no file available.</p>
                                </div>

                                <div v-if="!medias.loading" class="mfileloadmore">
                                    <div style="text-align:center;">
                                        <p v-if="medias.data.length != medias.pagination.total" style="margin-top: 50px;">Showing {{medias.pagination.per_page}} of {{medias.pagination.total}} media items</p>
                                        <button type="button" v-if="medias.pagination.next_page" @click="loadMoreMedias" style="margin-top: 20px;" class="mediaselect">Load More</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="mfileform">

                            <form v-if="edits" @submit.prevent="saveMedia">
                                <div :class="{
                                    formthumbl: true,
                                    isicon: edits.isicon,
                                }">
                                    <img :src="edits.thumbl" />
                                </div>
                                <p><strong>Uploaded on:</strong> {{ edits.date_uploaded }}</p>
                                <p v-if="edits.user"><strong>Uploaded by:</strong> {{ edits.user.name }}</p>
                                <p><strong>File name:</strong> {{ edits.file_name }}</p>
                                <p><strong>File type:</strong> {{ edits.mime }}</p>
                                <p><strong>File size:</strong> {{ edits.readsize }}</p>
                                <p v-if="edits.width && edits.height"><strong>Dimensions:</strong> {{edits.width}} by {{edits.height}} pixels</p>
                                <p><a href="#" style="color:red;" @click.prevent="removeMedia">Delete Media</a></p>
                                <hr style="margin-top: 15px;">
                                <div style="padding: 20px;" />
                                <p>
                                    <input class="border p-2" type="text" v-model="edits.alt_text" placeholder="Alternative Text">
                                    <small><a href="https://www.w3.org/WAI/tutorials/images/decision-tree" target="_blank">Describe the purpose of the image</a>. Leave empty if the image is purely decorative.</small>
                                </p>
                                <p>
                                    <input class="border p-2" type="text" v-model="edits.title" placeholder="Enter Title">
                                </p>
                                <p>
                                    <input class="border p-2" type="text" v-model="edits.caption" placeholder="Enter Caption">
                                </p>
                                <p>
                                    <textarea class="border p-2" v-model="edits.description" placeholder="Enter Description"></textarea>
                                </p>
                                <p>
                                    <label>File URL</label>
                                    <input type="text" class="border p-2" disabled v-model="edits.path">
                                    <button type="button" @click="copyfile" class="mediaselect">Copy to clipboard</button>
                                </p>
                                <div style="padding: 10px;" />
                                <p><a :href="edits.path" target="_blank">View attachment page</a></p>
                                <div style="padding: 20px;" />
                                <p>
                                    <button type="submit" class="mediaselect"
                                    :class="{ 'pointer-events-none': loadingsave, 'opacity-60': loadingsave }"
                                    >Save</button>
                                    <button @click="edits=null" class="mediaselect" type="button" style="color: #222;background: #ccc;">Cancel</button>
                                </p>
                            </form>

                        </div>

                    </div>
                </div>


                <div v-if="!ispage" class="mediafooter">
                    <button
                    v-if="ismedia"
                    type="button"
                    class="mediaselect"
                    :disabled="!getSelectedMedias.length"
                    @click="selectMediaDatas"
                    >{{ getButton }}</button>
                </div>
            </div>
        </div>

        <transition-group name="progress" tag="div" class="upload-status-lists" :duration="{ leave: 2000 }">
            <div v-for="(file, i) in getReadyFiles" :key="`progress-${i}`" 
            :class="{
                'upload-status': true,
                done: file.done
            }">
                <label>{{ file.file.name }}</label>
                <div class="progressbarwrap">
                    <div :class="{ 
                        progressbar: true
                    }"
                    :style="{ width: `${file.progress}%` }"
                    ></div>
                </div>
                <span v-if="file.message" class="progressbarmessage">{{ file.message }}</span>
            </div>
        </transition-group>

        <alert-confirm ref="alertconfirm"></alert-confirm>

    </div>
</template>
<script>
import "~/assets/dropzone.scss";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";

export default {
    components: {
        TSelectDynamic,
        AlertConfirm
    },
    props: ['batchlimit', 'title', 'button', 'mimes', 'api', 'multiple', 'selected', 'ispage', 'metauniqid', 'uploadername', 'nofiltercurpath'],
    data() {
        return {
            open: false,
            ismedia: false,
            readyFiles: [],
            limitBatch: 20,
            loadingUpload: false,
            loadingsave: false,
            medias: {
                loading: true,
                pagination: {},
                data: [],
                //datespage: 1,
                //dates: [],
                //datesloading: [],
                //datespagination: {},
                filter: {
                    query: null,
                    page: 1,
                    limit: 27,
                    date: null
                }
            },
            edits: null,
            isfiltering: true
        }
    },
    // mounted() {
    //     this.loadMediaDates();
    // },
    computed: {
        getuploadername() {
            if(!this.uploadername) {
                return `My`;
            }
            return this.uploadername;
        },
        getmetauniqid() {
            if(!this.metauniqid) {
                return null;
            }
            return this.metauniqid;
        },
        getnofiltercurpath() {
            return !this.nofiltercurpath;
        },
        getSelectedMedias() {
            return this.medias.data.filter(row => row.__selected);
        },
        getBatchLimit() {
            if( this.batchlimit ) { return this.batchlimit; }
            return this.limitBatch;
        },
        getTitle() {
            if(!this.title) { return `Select File`; }
            return this.title;
        },
        getButton() {
            if(!this.button) { return `Select`; }
            return this.button;
        },
        getReadyFiles() {
            return this.readyFiles.filter(row => !row.done).sort((a, b) => a.progress - b.progress);
        },
        getMimes() {
            if(!this.mimes) {
                return [
                    'image/jpg',
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/svg',
                    'video/mp4',
                    'audio/mp3',
                    'application/pdf',
                    'application/doc',
                    'application/docx'
                ].join(',');
            }
            return this.mimes.join(',');
        },
        getApi() {
            if(!this.api) { return `/uploads`; }
            return this.api;
        },
        getMediaData() {
            return this.medias.data.map(row => {
                if(row.mime.match(/application/g)) {
                    row.thumbl = require("~/static/icons/002-document.svg");
                    row.isicon = true;
                }
                else if(row.mime.match(/image/g)) {
                    row.thumbl = row.path;
                    row.isicon = false;
                }
                else if(row.mime.match(/video/g)) {
                    row.thumbl = require("~/static/icons/004-youtube.svg");
                    row.isicon = true;
                }
                else if(row.mime.match(/audio/g)) {
                    row.thumbl = require("~/static/icons/001-volume.svg");
                    row.isicon = true;
                }
                else {
                    row.thumbl = require("~/static/icons/003-blank-page.svg");
                    row.isicon = true;
                }
                return row;
            });
        },
    },
    watch: {
        ismedia(val) {
            if(val) {
                this.isfiltering = true;
                this.filterMedia();
            }
        },
        open(val) {
            if(val) {
                this.ismedia = false;
                this.resetSelected();
            }
        }
    },
    methods: {
        async copyfile() {
            if( this.edits ) {
                await navigator.clipboard.writeText(this.edits.path);
                this.notify({ title: 'Done!', html: 'Copied to clipboard' });
            }
        },
        openMedia(state = true) {
            this.open = state;
        },
        selectMediaDatas() {
            this.$emit('onselected', this.getSelectedMedias);
            this.open = false;
        },
        async removeMedia() {
            const e = this;
            this.$refs.alertconfirm.$alert({
                title: 'Confirm',
                html: 'Are you sure you want to remove this media? This cannot be undone.',
                execute: async function() {
                    try {
                        await e.$axios.delete(`${e.getApi}/${e.edits.uid}`);
                        e.filterMedia();
                        e.notify({ title: 'Done!', html: 'File has been removed.' });
                        e.edits = null;
                    } catch($e) {
                        e.notify({ title: 'Oops!', html: 'Failed to remove media, please try again.', type: 'danger' });
                        return false;
                    }
                }
            });
        },
        async saveMedia() {
            try {
                this.loadingsave = true;
                const res = await this.$axios.put(`${this.getApi}/${this.edits.uid}`, this.edits);
                const mediaIndex = this.medias.data.findIndex(row => row.id == this.edits.id);
                this.$set(this.medias.data, mediaIndex, {...this.medias.data[mediaIndex], ...res.data });
                this.loadingsave = false;
                this.notify({ title: 'Saved!', html: 'File has been saved.' });
            } catch($e) {
                this.loadingsave = false;
                this.notify({ title: 'Oops!', html: 'Failed to save media, please try again.', type: 'danger' });
                return false;
            }
        },
        resetSelected() {
            this.medias.data = [...this.medias.data.map(row => {
                row.__selected = false
                return row;
            })];
        },
        selectedMedia(media) {
            this.edits = media;
            const mediaIndex = this.medias.data.findIndex(row => row.id == media.id);
            if(this.multiple && !this.ispage) {
                // for multiple
                this.$set(this.medias.data, mediaIndex, {...media, __selected: !media.__selected });
                return true;
            }

            // for single only
            this.resetSelected();
            this.$set(this.medias.data, mediaIndex, {...media, __selected: !media.__selected });
            return true;
        },
        async loadMoreMedias() {
            this.medias.filter.page++;
            this.getMedias();
        },
        async filterMedia($args) {
            this.medias.filter.page = 1;
            this.medias.data = [];
            this.medias.pagination = {};
            this.getMedias({...$args});
        },
        // async loadMediaDates() {
        //     try {
        //         this.medias.datesloading = true;
        //         const res = await this.$axios.get(`${this.getApi}/dates?page=${this.medias.datespage}`);
        //         this.medias.dates = [...this.medias.dates, ...res.data.data.map(row => row.date_key)];
        //         this.medias.datespagination = res.data.pagination;
        //         this.medias.datesloading = false;
        //     } catch($e) {
        //         this.medias.datesloading = false;
        //     }
        // },
        async getMedias($args) {
            try {
                this.medias.loading = true;
                const res = await this.$axios.get(this.getApi, {
                    params: {
                        ...this.medias.filter,
                        ...$args,
                        mimes: this.getMimes,
                        meta_uniq_id: this.isfiltering && this.getmetauniqid ? this.getmetauniqid : null,
                        // path: this.getnofiltercurpath ? this.getClientPathforUpload : null
                    }
                });

                const uids = new Set(this.medias.data.map(d => d.uid));
                this.medias.data = [...new Set([...this.medias.data ,...res.data.medias.data.filter(d => !uids.has(d.uid))])];
                this.medias.pagination = res.data.medias.pagination;
                this.medias.loading = false;
            } catch($e) {
                this.medias.loading = false;
            }
        },

        async getFiles(e) {
            const instance = this;
            
            instance.readyFiles = [];

            if( e.target.files.length > this.getBatchLimit ) {
                this.notify({ title: 'Warning!', html: `Minimum of ${this.limitBatch} files per batch.`, type: 'warning' });
                return false;
            }
            for (var i = 0; i <= e.target.files.length - 1; i++) {
                const id = `${Date.now()}-${i}`;
                instance.readyFiles.unshift({
                    queueid: id,
                    progress: 0,
                    done: false,
                    file: e.target.files[i]
                });
            }            

            instance.getReadyFiles.map(async (row, index) => {
                try {
                    let data = new FormData();
                    data.append('file', row.file);

                    if(this.getnofiltercurpath) {
                        data.append('path', this.getClientPathforUpload);
                    }

                    if(this.getOrgUID) {
                        data.append('organization_uid', this.getOrgUID);
                    }
                    console.log(data);
                    
                    await instance.$axios.post(this.getApi, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: progressEvent => {
                            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                            instance.readyFiles[index].progress = percentCompleted;
                        }
                    });
                    instance.readyFiles[index].done = true;
                } catch($e) {
                    this.notify({ title: 'Oops!', html: `Failed to upload ${row.file.name}, please try again.`, type: 'danger' });
                    instance.readyFiles[index].progress = 100;
                    instance.readyFiles[index].done = true;
                }
            });
        }
    }
}
</script>