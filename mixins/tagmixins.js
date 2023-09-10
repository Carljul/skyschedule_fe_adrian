import {delegate} from "tippy.js";
import "tippy.js/dist/tippy.css";
import Loader from "@components/reusables/Loader.vue";
import Vue from "vue";

export default {
    data() {
        return {
            tippyDelegateInstances: [],
            tagLists: []
        }
    },
    methods: {
        tippySetContent(instance, entry) {
            instance.setContent(`
            <div class="flex items-start p-2 w-64">
                <div class="w-1/4 mr-2">
                    <img src="${entry.image && entry.image.url ? entry.image.url : require('~/static/user-profile.png')}" class="object-cover w-10 h-10 rounded-full" />
                </div>
                <div class="pl-1 w-3/4">
                    <p class="font-semibold --text-dark text-md">${entry.full_name_completed}</p>
                    <p>
                        <a href="mailto:${entry.user.email}" class="--text-primary text-xs --text-primary-hover">${entry.user.email}</a>
                    </p>
                    <p class="font-bold text-xs --text-dark">${entry.employee_id}</p>

                    <a href="/employees/${entry.uid}" target="_blank" class="p-1 text-xs px-3 text-white rounded btn --bg-primary --bg-primary-hover inline-block mt-3">View Profile</a>
                </div>
            </div>
            `)
        },
        async tippyOnShowData(instance) {
            const e = this;
            const uid = instance.reference.getAttribute('data-uid');
              // api savings
            const findFromTagLists = e.tagLists.findIndex(row => row.uid === uid);
            if(findFromTagLists >= 0) {
                e.tippySetContent(instance, e.tagLists[findFromTagLists]);
            } else {
                const res = await e.$axios.get(`/${e.getOrgUID}/employees/${uid}`);
                e.tippySetContent(instance, res.data.response);
                e.tagLists.push(res.data.response);
            }
        }
    },
    mounted() {
        var loaderContent = new Vue({
            ...Loader,
            parent: this,
            propsData: {
                additionalClass: 'primary'
            }
        }).$mount()

        this.tippyDelegateInstances = delegate('main', {
            target: '.data-employee-popover-editor',
            content: loaderContent.$el.outerHTML,
            theme: 'light',
            allowHTML: true,
            interactive: true,
            arrow: false,
            offset: [0,0],
            onShow: this.tippyOnShowData,
            appendTo: document.body
        });
    },
    beforeDestroy() {
        // memory leak prevention
        this.tippyDelegateInstances.map(instance => {
            instance.destroy(false);
        });
    }
}