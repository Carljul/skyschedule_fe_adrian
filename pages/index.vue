<template>
    <div class="index-page">
        
        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Welcome to your Dashboard!</h3>
            <breadcrumbs
            :disablemain="true"
            />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <!-- <div class="shadow rounded p-5">
                <h4 class="font-bold text-lg --text-dark text-center mb-5">Total Revenew</h4>
                <canvas id="totalRevenueChart" width="400" height="300"></canvas>
            </div> -->

            <div class="shadow rounded p-5">
                <h4 class="font-bold text-lg --text-dark text-center mb-5">Your Profile</h4>

                <div v-if="appIsAdmin">
                    <div class="flex items-start justify-center mt-5">
                        <div class="flex-shrink-0 w-20 h-20">
                            <img
                                class="w-20 h-20 rounded-full object-cover"
                                src="~/static/user-profile.png"
                                alt=""
                            />
                        </div>
                        <div class="ml-10">
                            <div class="text-lg font-medium --text-dark">{{$auth.user.name}}</div>
                            <div>
                                <a :href="`mailto:${$auth.user.email}`" :class="linkclass">{{$auth.user.email}}</a>
                            </div>

                            <div v-if="$auth.user.admin && $auth.user.admin.organization" class="mt-10">
                                <div class="text-md font-medium --text-dark">Managing:</div>
                                <div class="text-xs --text-dark">{{$auth.user.admin.organization.organization}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-if="appIsOrganization">
                    <div class="flex items-start justify-center mt-5">
                        <div class="flex-shrink-0 w-20 h-20">
                            <img
                                class="w-20 h-20 rounded-full object-cover"
                                src="~/static/user-profile.png"
                                alt=""
                            />
                        </div>
                        <div class="ml-10">
                            <div class="text-lg font-medium --text-dark">{{$auth.user.name}}</div>
                            <div>
                                <a :href="`mailto:${$auth.user.email}`" :class="linkclass">{{$auth.user.email}}</a>
                            </div>

                            <div class="mt-10">
                                <img v-if="$auth.user.organization.logo" :src="$auth.user.organization.logo.url" class="w-20 mb-2" alt="">
                                <div class="text-md font-medium --text-dark">{{$auth.user.organization.organization}}</div>
                                <div class="text-xs --text-dark">{{$auth.user.organization.timezone}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="appIsEmployee">
                    <div class="flex items-start justify-center mt-5">
                        <div class="flex-shrink-0 w-20 h-20">
                            <img
                                v-if="$auth.user.employee.image && $auth.user.employee.image.url"
                                class="w-20 h-20 rounded-full object-cover"
                                :src="$auth.user.employee.image.url"
                                alt=""
                            />
                            <img
                                v-else
                                class="w-20 h-20 rounded-full object-cover"
                                src="~/static/user-profile.png"
                                alt=""
                            />
                        </div>
                        <div class="ml-10">
                            <div class="text-lg font-medium --text-dark">{{$auth.user.employee.full_name_completed}}</div>
                            <div>
                                <a :href="`mailto:${$auth.user.email}`" :class="linkclass">{{$auth.user.email}}</a>
                            </div>
                            <div class="mt-3">
                                <div class="text-xs font-medium --text-dark">{{$auth.user.employee.position.position}}</div>
                                <div class="text-xs --text-dark">{{$auth.user.employee.position.department.name}}</div>
                            </div>

                            <div class="text-xs --text-dark">EMP ID: {{$auth.user.employee.employee_id}}</div>

                            <div class="text-xs --text-dark">SHIFT: 
                                <span>{{$momenttime($moment($auth.user.employee.shift_start))}}</span>
                                <span v-if="$auth.user.employee.shift_end"> - {{$momenttime($moment($auth.user.employee.shift_end))}}</span>
                            </div>

                            <div class="text-xs --text-dark">DATE HIRED: 
                                <span v-if="!$auth.user.employee.date_hired">{{$printdata($auth.user.employee.date_hired)}}</span>
                                <span v-else>{{$momentdatefull($moment($auth.user.employee.date_hired))}}</span>
                            </div>

                            <div class="text-xs --text-dark">BIRTHDAY: 
                                <span v-if="!$auth.user.employee.birthday">{{$printdata($auth.user.employee.birthday)}}</span>
                                <span v-else>{{$momentdatestandard($moment($auth.user.employee.birthday))}}</span>
                            </div>
                           
                            <div class="text-xs --text-dark">ADDRESS: {{$auth.user.employee.address}}</div>
                            <div class="text-xs --text-dark">PHONE #: {{$auth.user.employee.phone}}</div>


                            <div class="mt-10">
                                <img v-if="$auth.user.employee.organization.logo" :src="$auth.user.employee.organization.logo.url" class="w-20 mb-2" alt="">
                                <div class="text-md font-medium --text-dark">{{$auth.user.employee.organization.organization}}</div>
                                <div class="text-xs --text-dark">Timezone: {{$auth.user.employee.organization.timezone}}</div>
                            </div>


                            <div class="mt-10">                                
                                <div class="text-md font-medium --text-dark">Leave Credits Available</div>
                                <div class="text-xs --text-dark" v-for="(entry, entryindex) in $auth.user.leave_meta" :key="`department-entry-${genKey(entry)}`" >                                    
                                    <div class="text-xs --text-dark">Leave Type: {{entry.leave.title}} ( {{entry.credit_limit}} )</div>
                                    {{ totalItem(entry.leave.credit_limit,entry.credit_limit) }}
                             
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="shadow rounded p-5">
                <h4 class="font-bold text-lg --text-dark text-center mb-5">Custom Overview</h4>
                <canvas id="customOverviewChart" width="400" height="300"></canvas>
            </div> -->
            
        </div>

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
// import { Chart, registerables } from "chart.js";
export default {
    name: 'IndexPage',
    layout: 'main',
    middleware: ['auth'],
    components: {
        Breadcrumbs
    },
    methods:{
        totalItem: function (a,b) {
        return a - b;
        }
    },
    mounted() {

        // Chart.register(...registerables);

        // total revenew
        // const ctxTotalRevenew = document.getElementById('totalRevenueChart');
        // new Chart(ctxTotalRevenew, {
        //     type: 'bar',
        //     data: {
        //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //         datasets: [{
        //             label: 'Chart Label',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6'
        //             ],
        //             borderColor: [
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         responsive: true
        //     },
        // });



        // sales overview
        // const ctxSalesOverview = document.getElementById('salesOverviewChart');
        // new Chart(ctxSalesOverview, {
        //     type: 'line',
        //     data: {
        //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //         datasets: [{
        //             label: 'Chart Label',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6'
        //             ],
        //             borderColor: [
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         responsive: true
        //     },
        // });



        // custom overview
        // const ctxCustomOverview = document.getElementById('customOverviewChart');
        // new Chart(ctxCustomOverview, {
        //     type: 'bar',
        //     data: {
        //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //         datasets: [{
        //             label: 'Chart Label',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6'
        //             ],
        //             borderColor: [
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6',
        //                 '#1a73e8',
        //                 '#0760d6'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         responsive: true
        //     },
        // });

    }
}
</script>