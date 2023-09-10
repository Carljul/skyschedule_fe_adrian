<template>
    <modal ref="modal_editentry" @close="() => {
            setState({ ...state, selected: null });
            $router.push('/eods');
        }" id="modaledit" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Eod</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">

            <ValidationObserver ref="editeod" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(updateEod)">
                    <div class="form-group-wrap"> 
                        <ValidationProvider ref="editentry_project_name" name="project_name" v-slot="{ validate, errors }" rules="required">
                            <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Project Name</label>
                            <input 
                            :value="state.selected.project_name"
                            @input="e => { 
                                setState({ selected: { ...state.selected, project_name: e.target.value } }); 
                                validate(e); 
                            }"
                            type="text"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </ValidationProvider>             
                        <ValidationProvider ref="editentry_project_name" name="project_name" v-slot="{ validate, errors }" rules="required">
                            <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Task Priority</label>
                            <client-only>
                                <t-select-priority     
                                :value="state.selected.task_priority"                               
                                class="mt-3" @input="e => { 
                                    setState({ selected: { ...state.selected, task_priority: e } }); 
                                    
                                }">
                                </t-select-priority>
                                <input type="hidden" 
                                    :value="state.selected.task_priority" 
                                    @input="e => {
                                        setState({ selected: { ...state.selected, task_priority: e.target.value } }); 
                                        validate(e); 
                                    }"/>
                            </client-only>
                            <v-msg :error="errors[0]" />
                        </ValidationProvider>    
                        <ValidationProvider ref="editentry_project_name" name="project_name" v-slot="{ validate, errors }" rules="required">
                            <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Task Status</label>
                            <client-only>
                                <t-select-status     
                                :value="state.selected.task_status"                               
                                class="mt-3" @input="e => { 
                                    setState({ selected: { ...state.selected, task_status: e } }); 
                                    
                                }">
                                </t-select-status>
                                <input type="hidden" 
                                    :value="state.selected.task_status" 
                                    @input="e => {
                                        setState({ selected: { ...state.selected, task_status: e.target.value } }); 
                                        validate(e); 
                                    }"/>
                            </client-only>
                            <v-msg :error="errors[0]" />
                        </ValidationProvider>   
                        <ValidationProvider ref="editentry_project_name" name="project_name" v-slot="{ validate, errors }" rules="required">
                            <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Task Progress</label>
                            <client-only>
                                <t-select-progress     
                                :value="state.selected.task_progress"                               
                                class="mt-3" @input="e => { 
                                    setState({ selected: { ...state.selected, task_progress: e } }); 
                                    
                                }">
                                </t-select-progress>
                                <input type="hidden" 
                                    :value="state.selected.task_progress" 
                                    @input="e => {
                                        setState({ selected: { ...state.selected, task_progress: e.target.value } }); 
                                        validate(e); 
                                    }"/>
                            </client-only>
                            <v-msg :error="errors[0]" />
                        </ValidationProvider>        
                        <ValidationProvider ref="newentry_description" name="task_description" v-slot="{ validate, errors }" rules="required">                                
                            <div class="form-group-wrap mb-2">                            
                            <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Task Description</label>
                            <client-only>
                                <editor :value="state.selected.task_description"
                                @input="e => { 
                                    setState({ selected: { ...state.selected, task_description: e } });
                                    validate(e); 
                                }" />
                            </client-only>
                            <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>                                      
                        <ValidationProvider ref="editentry_date_hired" name="Start Date" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-start_time" class="mb-2 block text-xs font-medium --text-dark">Start Date</label>
                            <client-only>
                                <t-datepicker mode="datetime" 
                                :value="state.selected.start_time"
                                @input="e => { 
                                    setState({ selected: { ...state.selected, start_time: e } });
                                }"
                                v-vchecker="errors[0]"
                                ></t-datepicker>
                            </client-only>
                            <input type="hidden"
                            :value="state.selected.start_time"
                            @input="e => { 
                                setState({ selected: { ...state.selected, start_time: e.target.value } }); 
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>
                    <ValidationProvider ref="editentry_date_hired" name="End Date" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-end_time" class="mb-2 block text-xs font-medium --text-dark">End Date</label>
                            <client-only>
                                <t-datepicker mode="datetime" 
                                :value="state.selected.end_time"
                                @input="e => { 
                                    setState({ selected: { ...state.selected, end_time: e } });
                                }"
                                v-vchecker="errors[0]"
                                ></t-datepicker>
                            </client-only>
                            <input type="hidden"
                            :value="state.selected.end_time"
                            @input="e => { 
                                setState({ selected: { ...state.selected, end_time: e.target.value } }); 
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>                    
                    </div>

                    <div class="form-group-wrap">
                        <async-button ref="editeod_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                            Save Changes
                        </async-button>
                    </div>
                </form>
            </ValidationObserver>

        </template>
    </modal>
</template>

<script>
import permissions from "@permissions/leave_types.js";
import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from "@components/reusables/Modal.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import Editor from "@components/reusables/Editor.vue";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import TSelectStatus from "@components/reusables/SelectLeaveStatus.vue";
import DatePickerCustom from "@components/reusables/DatePicker.vue";
import TSelectPriority from "@components/reusables/SelectPriority.vue";
import TSelectTask from "@components/reusables/SelectTask.vue";
import TSelectProgress from "@components/reusables/SelectProgress.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'EmployeesEodEdit',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        TSelectDynamic,
        TSelectStatus,
        Editor,
        tDatepicker: DatePickerCustom,
        TSelectTask,
        TSelectPriority,
        TSelectProgress,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.main.eod.state
        }),
        ...permissions
    },
    methods: {
        ...mapMutations('main/eod', [
            'setState'
        ]),
        ...mapActions('main/eod', [
            'StoreUpdateEntry'
        ]),
        async updateEod() {
            try {
                this.$refs.editeod_btn.loading = true;
                await this.StoreUpdateEntry();                
                this.$refs.editeod_btn.loading = false;
                this.$refs.editeod.reset();
                
            } catch($e) {             
                this.errorHandle($e, 'editeod');
                this.$refs.editeod_btn.loading = false;
            }
        }
    }
}
</script>