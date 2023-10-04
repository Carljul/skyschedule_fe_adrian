<template>
    <aside
        class="fixed inset-y-0 bottom-0  z-20 flex flex-col flex-shrink-0 w-64 transition-all transform bg-white shadow-lg xl:fixed lg:z-auto lg:static lg:shadow-none"
        :class="{'-translate-x-full lg:translate-x-0 ': global.isSidebarOpen}"
    >
        <!-- <button @click="setState({ isSidebarOpen: !global.isSidebarOpen })" class="p-2 rounded-md lg:hidden absolute right-1 top-1" :class="{ 'text-slate-500': getOrgLogo }">
            <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button> -->

        <div class="items-center justify-between flex-shrink-0 p-2 --text-light bg-zinc-900">
        
        <nuxt-link to="/order">            
            <img src="~/static/logos-assets/sky-schedule-03@3x.png" class="block m-auto">            
        </nuxt-link>
        </div>

        <nav class="flex-1 bg-zinc-800">
        <ul class="mb-5 --pref-main-menu pt-5">    
            <li class="mb-2 n-sub-menu-main-cont">
                <nuxt-link
                    to="/order"
                    class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent text-slate-500 --border-primary-hover --text-primary-hover"
                    exact>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-10 w-10"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </span> 
                    <span class="text-sm">Orders</span>
                </nuxt-link>

            <div class="n-sub-menu-aa">
                        <div class="n-sub-cont-menu-aa">
            <div class="n-sub-menu-cont">
                            <a href="/order/by_id" class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent --text-dark --border-primary-hover --text-primary-hover"><div class="flex items-center justify-end w-full justify-between"><span class="text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" /></svg>
                                    Order By ID
                                </span></div></a>
                        </div>
            <div class="n-sub-menu-cont">
                            <a href="/order/by_date" class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent --text-dark --border-primary-hover --text-primary-hover"><div class="flex items-center justify-end w-full justify-between"><span class="text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                                    Order By Date
                                </span></div></a>
                        </div>
            <div class="n-sub-menu-cont">
                            <a href="/order/by_status" class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent --text-dark --border-primary-hover --text-primary-hover"><div class="flex items-center justify-end w-full justify-between"><span class="text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" /></svg>

                                    Order By Status
                                </span></div></a>
                        </div>
            <div class="n-sub-menu-cont">
                            <a href="/order/by_printtype" class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent --text-dark --border-primary-hover --text-primary-hover"><div class="flex items-center justify-end w-full justify-between"><span class="text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" /></svg>
                                    Order By Print Type
                                </span></div></a>
                        </div>
            </div>
                    </div></li>        
            <li class="mb-2">
                <nuxt-link
                    to="/total"
                    class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent text-slate-500 --border-primary-hover --text-primary-hover"
                    exact>
                    <div class="flex items-center justify-end w-full justify-between">
                        <span class="text-lg flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Totals
                        </span>
                    </div>
                </nuxt-link>
            </li>            
            <li class="mb-2"
            >
                <nuxt-link
                    to="/print_type"
                    class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent text-slate-500 --border-primary-hover --text-primary-hover" exact>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </span>
                    <span class="text-lg">Print Types</span>
                </nuxt-link>
            </li>            
            <!-- <li class="mt-5">
                <span class="--text-dark font-bold block p-3 text-xs">User Management</span>
            </li> -->
            <li v-if="$auth.user.role_id == 1" class="mb-2 n-sub-menu-main-cont">
                <nuxt-link
                    to="/user"
                    class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent text-slate-500 --border-primary-hover --text-primary-hover"
                    exact>
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-10 w-10"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                </span> 
                <span class="text-sm">User Management</span>
            </nuxt-link>

            <div class="n-sub-menu-aa">
                        <div class="n-sub-cont-menu-aa">
            <div class="n-sub-menu-cont">
                <nuxt-link
                    to="/user"
                    class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent text-slate-500 --border-primary-hover --text-primary-hover"
                    exact>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-10 w-10"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </span> 
                    <span class="text-sm">Users</span>
                </nuxt-link>
                        </div>
            <div class="n-sub-menu-cont">
                            <a href="/role" class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent --text-dark --border-primary-hover --text-primary-hover"><div class="flex items-center justify-end w-full justify-between"><span class="text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                                    Roles
                                </span></div></a>
                        </div>
            <div class="n-sub-menu-cont">
                            <a href="/ability" class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent --text-dark --border-primary-hover --text-primary-hover"><div class="flex items-center justify-end w-full justify-between"><span class="text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                            </svg>
                                    Abilities
                                </span></div></a>
                        </div>
            </div>
                    </div></li>    
            <li class="mb-2">
                <nuxt-link
                    to="/charts"
                    class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent text-slate-500 --border-primary-hover --text-primary-hover"
                    exact>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                        </svg>
                    </span>
                    <div class="w-full">
                        <span class="text-lg">Charts</span>
                    </div>
                </nuxt-link>
            </li>             
            

        </ul>
        </nav>

    </aside>
</template>
<style scoped>
li.mb-2.n-sub-menu-main-cont .n-sub-menu-aa {
    position: absolute;
    top: 0;
    left: calc(100% + 5px);
    background: #2D2E3D;
}
li.mb-2.n-sub-menu-main-cont:hover .n-sub-menu-aa {
    opacity: 1;
    visibility: visible;
}
li.mb-2.n-sub-menu-main-cont .n-sub-menu-aa {
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    width:100%;
}

li.mb-2.n-sub-menu-main-cont {
    position: relative;
}

li.mb-2.n-sub-menu-main-cont .n-sub-menu-aa a {
    border: none;
    padding-left: 20px;
    padding-right: 20px;
}

li.mb-2.n-sub-menu-main-cont .n-sub-menu-aa .n-sub-cont-menu-aa:before {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    background: #27272a;
    transform: rotate(45deg);
    position: absolute;
    top: 10px;
    left: -8px;
    border: solid #fff;
    border-width: 0 0 3px 3px;
}

li.mb-2.n-sub-menu-main-cont .n-sub-menu-aa .n-sub-cont-menu-aa .n-sub-menu-cont {
    background: #27272a;
    position: relative;
    z-index: 9999;
}
ul.--pref-main-menu li span {
    display: block;
}

ul.--pref-main-menu li span svg {
    margin: auto;
}

ul.--pref-main-menu li a {
    display: block;
    text-align: center;
}

ul.--pref-main-menu li a div {
    display: block;
}
.nuxt-link-active{
    color:#b3241a;
}
</style>
<script>
import { mapState, mapMutations } from "vuex"

import employeePermissions from "@permissions/employee.js";
import orderPermissions from "@permissions/order.js";
import departmentsPermissions from "@permissions/departments.js";
import eodPermissions from "@permissions/eod.js";
import leavetypesPermissions from "@permissions/leave_types.js";
import positionsPermissions from "@permissions/positions.js";
import timesheetsPermissions from "@permissions/timesheets.js";
import orgPermissions from "@permissions/org-settings.js";
import overtimePermissions from "@permissions/overtime.js";
import metricsPermissions from "@permissions/metrics.js";

export default {
    computed: {
        ...mapState({
            global: state => state.global.state
        }),
        permissions() {
            return {
                employee: employeePermissions.permissions(),
                order: orderPermissions.permissions(),
                departments: departmentsPermissions.permissions(),
                eod: eodPermissions.permissions(),
                leave_types: leavetypesPermissions.permissions(),
                positions: positionsPermissions.permissions(),
                timesheets: timesheetsPermissions.permissions(),
                settings: orgPermissions.permissions(),
                overtime: overtimePermissions.permissions(),
                metrics: metricsPermissions.permissions(),
            }
        },
        showEmployee() {
            const emppermissions = [
                this.permissionCheck(this.permissions.employee.manage),                
                this.permissionCheck(this.permissions.timesheets.manage),
                this.permissionCheck(this.permissions.departments.manage),
                this.permissionCheck(this.permissions.leave_types.manage),
                this.permissionCheck(this.permissions.positions.manage),
                this.permissionCheck(this.permissions.eod.manage)
            ];
            return emppermissions.find(row => row === true);
        }
    },
    methods: {
        ...mapMutations('global', [
            'setState'
        ])
    }
}
</script>
