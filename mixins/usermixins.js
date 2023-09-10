import Vue from "vue";
import defaults from "~/defaults.js";

const usermixins = {
    computed: {
        getOrgLogo() {
            const user = this.$nuxt.$auth.user;
            if(user.user_type == defaults.usertypes[1]) {
              if(user.organization.logo) {
                return user.organization.logo.url;
              }
            }
    
            if(user.user_type == defaults.usertypes[2]) {
              if(user.employee.organization.logo) {
                return user.employee.organization.logo.url;
              }
            }
    
            return null;
          },
          getOrgName() {
            const user = this.$nuxt.$auth.user;
            if(user.user_type == defaults.usertypes[1]) {
              return user.organization.organization;
            }
    
            if(user.user_type == defaults.usertypes[2]) {
              if(!user.employee.organization.logo) {
                return user.employee.organization.organization;
              }
            }
            return defaults.appname;
          },
        getOrgUID() { 
            const user = this.$nuxt.$auth.user;

            if(user.user_type == defaults.usertypes[0] && user.admin) {
              return user.admin.meta_value;
            }

            if(user.user_type == defaults.usertypes[1]) {
              return user.organization.uid;
            }
    
            if(user.user_type == defaults.usertypes[2]) {
              return user.employee.organization_uid;
            }
    
            return null;
        },
        getOrganization() {
          const user = this.$nuxt.$auth.user;

            if(user.user_type == defaults.usertypes[0] && user.admin) {
              return user.admin.organization;
            }

            if(user.user_type == defaults.usertypes[1]) {
              return user.organization;
            }
    
            if(user.user_type == defaults.usertypes[2]) {
              return user.employee.organization;
            }
    
            return null;
        },
        appIsAdmin() {
            return this.$nuxt.$auth.user.user_type == defaults.usertypes[0];
          },
          appIsEmployee() {
            return this.$nuxt.$auth.user.user_type == defaults.usertypes[2];
          },
          appIsOrganization() {
            return this.$nuxt.$auth.user.user_type == defaults.usertypes[1];
        },
    },
    methods: {
      permissionCheck($permission) {
        const user = this.$nuxt.$auth.user;
        if(user.user_type == defaults.usertypes[2]) {
          const userFindPermission = user.permissions.find(row => (row.permission.permission_key == $permission) && (row.permission_value==1));
          const positionFindPermission = user.employee.position.permissions.find(row => (row.permission.permission_key == $permission) && (row.permission_value==1));
          if(Boolean(userFindPermission || positionFindPermission) === false) {
              return false;
          }
        }
        return true;
      }
    }
}

Vue.mixin(usermixins);