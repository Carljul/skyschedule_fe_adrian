<template>
    <div>
        <div v-if="appIsEmployee">
            <div v-if="!attendance.loading">
                <async-button type="button" 
                @click="execInOut"
                ref="timeinout" v-if="attendance.attendance" 
                class="btn py-2 px-5 rounded --text-light --bg-danger text-sm uppercase font-bold w-40 text-center cursor-pointer"
                :title="appdefaults.timeout" 
                v-tooltip="appdefaults.timeout"
                :style="{
                    'background': getAttendanceTrigger.color
                }"
                >{{realtimeMoment.diff($moment(attendance.attendance.time_in), 'hours')}} HOURS</async-button>

                <async-button 
                @click="execInOut"
                type="button" ref="timeinout" v-else 
                class="btn py-2 px-5 rounded --text-light --bg-success text-sm uppercase font-bold w-40 text-center cursor-pointer"
                >{{appdefaults.timein}}</async-button>
            </div>
            <div v-else>
                <button type="button"
                :disabled="true"
                class="btn py-2 px-5 rounded --text-light bg-gray-400 text-sm uppercase font-bold w-40 text-center cursor-pointer"
                ><span>Loading</span></button>
            </div>
        </div>

        <modal ref="attendancemodal"
        nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12"
        @close="attendanceSetState({ handle: 'state', key: 'notes', value: null })"
        >
            <template slot="header">
                <div>
                    <h4 class="--text-heading text-lg font-semibold">
                        <span>Clockout Note:</span>
                    </h4>
                    <label class="mb-2 block text-xs font-medium --text-dark">Attendance Early Out Notes</label>
                </div>
            </template>

            <template slot="content">
                <ValidationObserver ref="newentry" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(execInOutModal)">
                        <ValidationProvider name="Notes" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <textarea 
                                    :value="attendance.notes"
                                    @input="e => { 
                                        attendanceSetState({ handle: 'state', key: 'notes', value: e.target.value });
                                        validate(e); 
                                    }"
                                    type="text"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                    v-vchecker="errors[0]"
                                    ></textarea>
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <async-button
                        type="submit" ref="attendancemodalbtn"
                        class="btn py-3 px-5 rounded --text-light --bg-primary text-sm uppercase font-bold w-40 text-center cursor-pointer"
                        >Timeout</async-button>
                    </form>
                </ValidationObserver>
            </template>
        </modal>

        <!-- start eod -->
        <modal ref="eodmodal"
        nofooter contentclass="xl:w-9/12 md:w-11/12 sm:w-12/12"
        @close="eodSetState({ handle: 'state', key: 'notes', value: null })"
        >
            <template slot="header">
                <div class="px-3">
                    <h4 class="--text-heading text-lg font-semibold">
                        <span>EOD</span>
                    </h4>
                </div>
            </template>

            <template slot="content">
                <ValidationObserver ref="newentry" v-slot="{ handleSubmit }">
                    <form id="eod-form" class="-mt-6" @submit.prevent="handleSubmit(execInOutModal)">
                        <ValidationProvider name="Notes" v-slot="{ validate, errors }" >
                            <div v-for="inputs_data in inputs_count" :key="inputs_data.id" class="input-add-main-container relative flex flex-wrap border-b border-gray-300 py-8">
                                <div class="projects w-3/12">
                                    <div class="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        Project
                                    </label>
                                    <input class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" required>
                                    </div>
                                </div>
                                <div class="task-priority w-3/12">
                                    <div class="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                            Priority
                                        </label>                                
                                        <ValidationProvider ref="newentry_department_uid" name="Leave Type" v-slot="{ validate, errors }" >
                                            <div class="form-group-wrap mb-3 ">
                                                <client-only>
                                                    <t-select-priority                                     
                                                    class="mt-3"></t-select-priority>
                                                    <input type="hidden" >
                                                </client-only>
                                                <v-msg :error="errors[0]" />
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                </div>
                                <div class="task w-3/12">
                                    <div class="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        Task
                                    </label>
                                    <client-only>
                                        <t-select-task                                     
                                        class="mt-3" ></t-select-task>
                                        <input type="hidden" >
                                    </client-only>
                                    </div>
                                </div>
                                <div class="task-progress w-3/12">
                                    <div class="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        Progress
                                    </label>
                                    <client-only>
                                        <t-select-progress                                     
                                        class="mt-3" ></t-select-progress>
                                        <input type="hidden" >
                                    </client-only>
                                    </div>
                                </div>
                                <div class="task-description w-6/12">
                                    <div class="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        Task Description
                                    </label>                                
                                    <textarea 
                                        type="text"
                                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-28" 
                                        v-vchecker="errors[0]"
                                        ></textarea>
                                    <v-msg :error="errors[0]" />
                                    </div>
                                </div>
                                <div class="start-start w-3/12">
                                    <div class="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        Start
                                    </label>                                
                                    <ValidationProvider ref="newentry_start_date" name="Date Start" v-slot="{ validate, errors }" >
                                        <div class="form-group-wrap mb-2">
                                            <client-only>
                                                <t-datepicker mode="datetime" v-vchecker="errors[0]"
                                                ></t-datepicker>
                                            </client-only>
                                            <input type="hidden">
                                            <v-msg :error="errors[0]" />
                                        </div>
                                    </ValidationProvider>
                                    </div>
                                </div>
                                <div class="end-time w-3/12">
                                    <div class="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        End
                                    </label>
                                        <ValidationProvider ref="newentry_start_date" name="Date Start" v-slot="{ validate, errors }" >
                                            <div class="form-group-wrap mb-2">                                    
                                                <client-only>
                                                    <t-datepicker mode="datetime" v-vchecker="errors[0]"
                                                    ></t-datepicker>
                                                </client-only>
                                                <input type="hidden">
                                                <v-msg :error="errors[0]" />
                                            </div>
                                        </ValidationProvider>
                                    </div>
                                </div>
                                <div @click="deleteInput" class="delete-input-add absolute top-2 right-1 cursor-pointer">
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" className="w-6 h-6" style="width: 30px;fill: red;color: #fff;"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
                                    </p>
                                </div>
                            </div>
                        </ValidationProvider>

                        <div class="additional-eod w-full md:w-3/3 px-3 mb-8 md:mb-0 text-center -mt-4 relative">
                                <p @click="addInput" class="mx-auto btn py-1 px-3 rounded --text-light --bg-primary text-lg uppercase font-bold w-10 text-center cursor-pointer"
                                        >+</p>
                        </div>

                        <div class="px-3 mt-5">
                            <async-button
                            type="submit" ref="attendancemodalbtn"
                            class="btn py-3 px-5 rounded --text-light --bg-primary text-sm uppercase font-bold w-40 text-center cursor-pointer"
                            >Timeout</async-button>
                        </div>
                    </form>
                </ValidationObserver>
            </template>
        </modal>
        <!-- end eod -->
    </div>
</template>
<style scoped>
.input-add-main-container:first-child .delete-input-add {
    display: none;
}
</style>
<script>
import { mapState, mapMutations, mapActions } from "vuex"
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from '@components/reusables/Modal.vue';
import momentrealtimemixins from '~/mixins/momentrealtime';
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import DatePickerCustom from "@components/reusables/DatePicker.vue";
import TSelectPriority from "@components/reusables/SelectPriority.vue";
import TSelectTask from "@components/reusables/SelectTask.vue";
import TSelectProgress from "@components/reusables/SelectProgress.vue";
export default {
    name: 'TimersInOut',
    mixins: [momentrealtimemixins],
    components: {
        Modal,
        ValidationProvider,
        ValidationObserver,
        TSelectDynamic,
        tDatepicker: DatePickerCustom,
        TSelectTask,
        TSelectPriority,
        TSelectProgress,
        VMsg,
        AsyncButton
    },
    data() {
        return {
            inputs_count: 1,
            all_inputs_array: [],
        }
    },
    computed: {
        ...mapState({
            attendance: state => state.employees.attendance.state,
        }),

        getAttendanceTrigger() {
            const defaultSetting = { hour: 1, color: 'var(--pref-color-primary)' };

            if(this.appIsEmployee && this.attendance.attendance) {
                const attendancesettings = Array.isArray(this.getOrganization.attendance_settings) ? this.getOrganization.attendance_settings : [];
                if(!attendancesettings.length) { return defaultSetting; }
                
                const getCurrentHourTimeIn = this.realtimeMoment.diff(this.$moment(this.attendance.attendance.time_in), 'hours');
                const getAttendanceSetting = attendancesettings.filter(row => row.hour >= getCurrentHourTimeIn);
                if(!getAttendanceSetting.length) {
                    // get first lowest
                    return attendancesettings.reduce((prev, current) => {
                        return (prev.hour < current.hour) ? prev : current;
                    });
                }

                return getAttendanceSetting.reduce((prev, current) => {
                    return (prev.hour < current.hour) ? prev : current;
                });
            }

            return defaultSetting;
        },
    },

    methods: {
        ...mapMutations('employees/attendance', {
            attendanceSetState: 'setState',
            eodSetState: 'setState'
        }),
        ...mapActions('employees/attendance', [
            'timeInOut',
            'eodSubmit'
        ]),
        addInput() {
            this.inputs_count++;
        },
        deleteInput() {
            this.inputs_count--;
        },
        saveEODData(){
            this.all_inputs_array = [];
            let myForm = document.querySelectorAll('#eod-form .input-add-main-container'); 
            
            for(var i = 0; i < myForm.length; i++){
                var input_dictionary = {};
                var project_name = myForm[i].querySelector(".projects input").value;

                if(!myForm[i].querySelectorAll(".task-priority span.vs__selected").length == 0){
                    var task_priority = myForm[i].querySelector(".task-priority span.vs__selected").textContent.trim();
                }else{
                    var task_priority = "";
                }
                if(!myForm[i].querySelectorAll(".task span.vs__selected").length == 0){
                    var task_status = myForm[i].querySelector(".task span.vs__selected").textContent.trim();
                }else{
                    var task_status = "";
                }
                if(!myForm[i].querySelectorAll(".task-progress span.vs__selected").length == 0){
                    var task_progress = myForm[i].querySelector(".task-progress span.vs__selected").textContent.trim();
                }else{
                    var task_progress = "";
                }
                
                var task_description = myForm[i].querySelector(".task-description textarea").value;
                var start_time = myForm[i].querySelector(".start-start input").value;
                var end_time = myForm[i].querySelector(".end-time input").value;
                console.log('end',end_time);
                input_dictionary.project_name = project_name;
                input_dictionary.task_priority = task_priority;
                input_dictionary.task_status = task_status;
                input_dictionary.task_progress = task_progress;
                input_dictionary.task_description = task_description;
                input_dictionary.start_time = start_time;
                input_dictionary.end_time = end_time;
                this.all_inputs_array.push(input_dictionary);
            }
            // console.log("all_inputs_array", );

            // let formData = new FormData(myForm);
            // console.log("myForm", formData);
            // const data = {}; 
            // // need to convert it before using not with XMLHttpRequest
            // for (let [key, val] of formData.entries()) {
            //     Object.assign(data, {[key]: val})
            // }
            // console.log(data);
            this.attendanceSetState({ handle: 'state', key: 'eod', value: this.all_inputs_array });
            this.eodSubmit();
        },
        async execInOut() {
            try {
                this.$refs.timeinout.loading = true;
                // await this.timeInOut();
                // this.$nuxt.$emit('timeInOut');
                // this.$refs.timeinout.loading = false;
                this.$refs.eodmodal.open = true;
            } catch($e) {
                this.$refs.timeinout.loading = false;
                if($e.response.status==422 && $e.response.data.response=="notes required") {
                    // this.$refs.attendancemodal.open = true;
                    this.$refs.eodmodal.open = true;
                }
                else if($e.response.status==422 && $e.response.data.response=="shift early") {
                    this.notify({ 
                        title: 'Timein Disabled', 
                        html: `You are not allowed to timein, please come back before ${this.getOrganization.attendance_min_in_hours} minutes from your shift schedule.<br><strong>SHIFT: ${this.$momenttime(this.$moment(this.$auth.user.employee.shift_start))}</strong>`, 
                        type: 'warning' 
                    });
                }
            }
        },
        
        async execInOutModal() {
            this.saveEODData();
            this.$refs.attendancemodalbtn.loading = true;
            await this.timeInOut();
            this.$nuxt.$emit('timeInOut');
            this.attendanceSetState({ handle: 'state', key: 'notes', value: null });
            this.attendanceSetState({ handle: 'state', key: 'attendance', value: null });
            this.$refs.attendancemodal.open = false;
        }
    }
    
}
</script>