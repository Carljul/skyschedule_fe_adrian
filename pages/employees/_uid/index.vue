<template>
    <div class="employees-profile-page mb-10">

        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Employee Profile</h3>
            <breadcrumbs
            :lists="[
                { text: 'Employees', link: '/employees' },
                { text: employee.full_name }
            ]"
            />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
            <div>
                <div class="flex items-center mb-5">
                    <div>
                        <img v-if="employee.image && employee.image.url" :src="employee.image.url" class="w-20 h-20 rounded-full object-cover" alt="employee.employee.image.alt">
                        <img v-else src="~/static/user-profile.png" class="w-20 h-20 rounded-full object-cover" alt="">
                    </div>
                    <div class="ml-5">
                        <h2 class="font-bold --text-dark text-xl">{{employee.full_name_completed}}</h2>
                        <p><a class="--text-primary text-sm --text-primary-hover" :href="`mailto:${employee.user.email}`">{{employee.user.email}}</a></p>
                        <p class="--text-dark"><span class="font-bold text-xs">{{employee.employee_id}}</span></p>
                    </div>
                </div>

                <div class="mb-5" >
                    <label class="--text-primary text-sm font-bold uppercase">Birthdate:</label>
                    <p class="--text-dark">
                        <span v-if="!employee.birthday" class="text-sm --text-dark">{{$printdata(employee.birthday)}}</span>
                        <span v-else class="text-sm --text-dark">{{$momentdatestandard($moment(employee.birthday))}}</span>
                    </p>
               </div>

                <div class="mb-5" >
                    <label class="--text-primary text-sm font-bold uppercase">Date Hired:</label>
                    <p class="--text-dark">
                        <span v-if="!employee.date_hired" class="text-sm --text-dark">{{$printdata(employee.date_hired)}}</span>
                        <span v-else class="text-sm --text-dark">{{$momentdatefull($moment(employee.date_hired))}}</span>
                    </p>
               </div>

                <div class="mb-5">
                    <label class="--text-primary text-sm font-bold uppercase">Position:</label>
                    <p class="text-lg font-bold --text-dark">{{employee.position.department.name}}</p>
                    <p class="--text-dark">{{employee.position.position}}</p>
               </div>
                
                <div class="mb-5">
                    <label class="--text-primary text-sm font-bold uppercase">Shift:</label>
                    <p class="--text-dark">
                        <span>{{$momenttime($moment(employee.shift_start))}}</span>
                        <span v-if="employee.shift_end"> - {{$momenttime($moment(employee.shift_end))}}</span>
                    </p>
               </div>

               <div class="mb-5" >
                    <label class="--text-primary text-sm font-bold uppercase">Phone #:</label>
                    <p class="--text-dark">
                        <a v-if="employee.phone" :href="`tel:${employee.phone}`" class="--text-primary text-sm --text-primary-hover">{{$printdata(employee.phone)}}</a>
                        <span v-else class="text-sm --text-dark">{{$printdata(employee.phone)}}</span>
                    </p>
               </div>


               <div class="mb-5" >
                    <label class="--text-primary text-sm font-bold uppercase">Address:</label>
                    <p class="--text-dark">
                        <span class="text-sm --text-dark">{{$printdata(employee.address)}}</span>
                    </p>
               </div>


               <div class="mb-5" >
                    <label class="--text-primary text-sm font-bold uppercase">Description:</label>
                    <div class="--text-dark v-html" v-html="employee.description"></div>
               </div>

            </div>



            <!-- right side -->
            <div>
               
               <div class="mb-5">
                <label class="--text-primary text-sm font-bold uppercase">Documents:</label>

                <div class="text-right my-5">
                    <input type="text" 
                    v-model="searchdoc"
                    placeholder="Search Document" class="border border-gray-300 --text-dark text-sm rounded block p-2 px-4 w-64 max-w-full" />
                </div>

                <div class="grid grid-cols-5 gap-4 mt-5">
                    <div v-for="(doc, doci) in getDocuments" :key="`emp-doc-${genKey(doc)}`" class="max-w-sm bg-white rounded border shadow">
                        <a :href="doc.url" target="_blank" class="p-2">
                            <img class="rounded h-10 m-auto object-cover" :src="$imagebymimes(doc.url)" :alt="doc.title" />
                        </a>
                        <div class="p-3">
                            <a :href="doc.url" target="_blank">
                                <span class="text-xs tracking-tight font-semibold --text-dark text-center block">{{$printdata(doc.title)}}</span>
                            </a>
                        </div>
                    </div>
                </div>

                <p v-if="!getDocuments.length" class="text-center --text-dark text-sm">No Document</p>

                
               </div>

            </div>
            <!-- right side end -->
        </div>

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import defaults from "~/defaults.js";

export default {
    name: "EmployeesProfilePage",
    layout: "main",
    middleware: ['auth', 'organizationUID'],
    ssr: false,
    components: {
        Breadcrumbs
    },
    head() {
        return {
            title: `${this.employee.full_name_completed}` + this.theAppTitle
        }
    },
    data() {
        return {
            searchdoc: null
        }
    },
    computed: {
        getDocuments() {
            const e = this;
            if(!e.searchdoc) { return e.employee.documents }
            return e.employee.documents.filter(item => {
                return item.title
                .toLowerCase()
                .includes(this.searchdoc.toLowerCase())
            });
        }
    },
    async asyncData({ params, error, $axios, store }) {
        try {
            const res = await $axios.get(`/${store.state.global.state.organizationUID}/employees/${params.uid}`);
            return { employee: res.data.response }
        } catch(err) {
            error({
                statusCode: 404, 
                message: defaults.notfound
            });
        }
    },
}
</script>