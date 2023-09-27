<template>
    <div>
        <ValidationObserver ref="editentry" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(updateEntry)">

                <div class="">
                    <div>
                        <h4 class="--text-dark font-semibold text-md mb-2">Credential</h4>
                        <ValidationProvider ref="editentry_email" name="Email" v-slot="{ validate, errors }"
                            rules="required|email">
                            <div class="form-group-wrap mb-2">
                                <label for="new-email" class="mb-2 block text-xs font-medium --text-dark">Email</label>
                                <input :value="state.selected.email" @input="e => {
                                    setState({ selected: { ...state.selected, user: { ...state.selected, email: e.target.value } } });
                                    validate(e);
                                }" type="email"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                                    v-vchecker="errors[0]" />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>


                        <div class="form-group-wrap mb-3">
                            <label class="--text-dark mb-2 text-sm block">
                                <input type="checkbox" :true-value="true" :false-value="false"
                                    :checked="state.selected.canupdatepassword" @input="e => {
                                        setState({ selected: { ...state.selected, canupdatepassword: !state.selected.canupdatepassword } });
                                    }" class="mr-1" />
                                Update the password
                            </label>
                        </div>

                        <div v-if="state.selected.canupdatepassword">
                            <ValidationProvider vid="editentry_password" ref="editentry_password" name="Password"
                                v-slot="{ validate, errors }" rules="required|min:8">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-password"
                                        class="mb-2 block text-xs font-medium --text-dark">Password</label>
                                    <input :value="state.selected.password" @input="e => {
                                        setState({
                                            selected: {
                                                ...state.selected,
                                                user: {
                                                    ...state.selected,
                                                    password: e.target.value
                                                }
                                            }
                                        });
                                        validate(e);
                                    }" type="password"
                                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                                        v-vchecker="errors[0]" />
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>
                            
                            <ValidationProvider ref="newentry_password_confirmation" name="Confirm Password"
                                v-slot="{ validate, errors }" rules="required|confirmed:newentry_password|min:8">
                                <div class="form-group-wrap mb-3">
                                    <label class="mb-1 block text-xs font-medium --text-dark">Confirm Password</label>
                                    <input :value="state.selected.password_confirmation" @input="e => {
                                        setState({
                                            selected: {
                                                ...state.selected,
                                                user: {
                                                    ...state.selected,
                                                    password_confirmation: e.target.value
                                                }
                                            }
                                        });
                                        validate(e);
                                    }" type="password"
                                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                                        v-vchecker="errors[0]" />
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>

                        </div>

                        <h4 class="--text-dark font-semibold text-md mb-2 mt-10">Information</h4>

                        <!-- <div class="form-group-wrap mb-2">
                        <label for="new-firstname" class="mb-2 block text-xs font-medium --text-dark">Employee Photo</label>
                        <dropzone-min
                        :mimes="imageMimes"
                        title="Employee Photo"
                        :value="state.selected.avatar"
                        @input="e => { 
                            setState({ selected: { ...state.selected, avatar: e } });
                        }"
                        />
                    </div> -->
                        <ValidationProvider ref="editentry_username" name="username" v-slot="{ validate, errors }"
                            rules="required">
                            <div class="form-group-wrap mb-2">
                                <label for="new-username"
                                    class="mb-2 block text-xs font-medium --text-dark">Username</label>
                                <input :value="state.selected.username" @input="e => {
                                    setState({ selected: { ...state.selected, username: e.target.value } });
                                    validate(e);
                                }" type="text"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                                    v-vchecker="errors[0]" />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>
                        <ValidationProvider ref="editentry_name" name="name" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-2">
                                <label for="new-name" class="mb-2 block text-xs font-medium --text-dark">Name</label>
                                <input :value="state.selected.name" @input="e => {
                                    setState({ selected: { ...state.selected, name: e.target.value } });
                                    validate(e);
                                }" type="text"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                                    v-vchecker="errors[0]" />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <h4 class="--text-dark font-semibold text-md mb-2">Role</h4>

                        <ValidationProvider ref="user_role" name="Role" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Role</label>
                                <client-only>
                                    <t-select
                                        v-bind="$attrs"
                                        v-on="$listeners"
                                        :options="rolesOption"
                                        label="label"
                                        :clearable="false"
                                        :class="{ 'p-1.5': true }"
                                        :value="state.selected.role != null ? state.selected.role.name : ''"
                                        @input="e => {
                                            setState({ selected: {
                                                    ...state.selected,
                                                    role: e.value,
                                                    role_id: e.value
                                                },
                                            });
                                            validate(e);
                                        }"
                                    />
                                </client-only>
<!--                                 
                                <client-only>
                                    <t-select-dynamic 
                                    :endpoint="`/roles`" 
                                    v-bind="$attrs"
                                    v-on="$listeners"
                                    datakeylabel="name" 
                                    datakeyvalue="id"
                                    searchplaceholder="Type to Search Roles"
                                    placeholder="Choose Roles"
                                    class="py-1.5"
                                    v-vchecker="errors[0]"
                                    :value="state.selected.role != null ? state.selected.role.name : ''"
                                    @input="e => {
                                        setState({ selected: {
                                                ...state.selected,
                                                role: e.value,
                                                role_id: e.value
                                            },
                                        });
                                        validate(e);
                                    }"
                                    ></t-select-dynamic>
                                    <input type="hidden" 
                                    :value="state.selected.role != null ? state.selected.role.name : ''" 
                                    @input="e => {
                                        setState({ selected: {
                                                ...state.selected,
                                                role: e.value,
                                                role_id: e.value
                                            },
                                        });
                                        validate(e);
                                    }">
                                </client-only> -->
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>
                    </div>

                </div>



                <div class="form-group-wrap">
                    <async-button ref="editentry_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                        Save Changes
                    </async-button>
                </div>

            </form>
        </ValidationObserver>
    </div>
</template>
<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import DropzoneMin from "@components/reusables/DropZoneMin.vue";
import Editor from "@components/reusables/Editor.vue";
import draggable from "vuedraggable";
import DatePickerCustom from "@components/reusables/DatePicker.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import { VueMaskDirective } from "v-mask";
import TSelect from "@components/reusables/Select.vue";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
    name: 'EmployeeFormComponent',
    props: {
        excludefields: {
            type: Array,
            default: () => []
        }
    },
    directives: {
        mask: VueMaskDirective
    },
    data() {
        return {
            rolesOption: []
        }
    },
    components: {
        AsyncButton,
        TSelectDynamic,
        DropzoneMin,
        Editor,
        draggable,
        tDatepicker: DatePickerCustom,
        ValidationProvider,
        ValidationObserver,
        VMsg,
        TSelect
    },
    computed: {
        ...mapState({
            state: state => state.main.user.state,
            role: state => state.main.role.state
        }),
    },
    async mounted() {
        await this.setupRoleDropdown();
    },
    methods: {
        ...mapMutations('main/user', [
            'setState',
            'updateArrayState',
            'removeArrayState'
        ]),
        ...mapActions('main/user', [
            'StoreUpdateEntry'
        ]),
        ...mapActions('main/role', {
            fetchRoleEntry: 'fetchEntry'
        }),
        async updateEntry() {
            try {
                this.$refs.editentry_btn.loading = true;
                await this.StoreUpdateEntry();
                this.$refs.editentry_btn.loading = false;
                this.$refs.editentry.reset();
            } catch ($e) {
                this.errorHandle($e, 'editentry');
                this.$refs.editentry_btn.loading = false;
            }
        },
        async setupRoleDropdown() {
            await this.fetchRoleEntry();
            var roleData = this.role.entry.data;
            for (var x = 0; x < roleData.length; x++) {
                this.rolesOption.push({
                    label: roleData[x].name,
                    value: roleData[x].id,
                });
            }
        }
    }
}
</script>