import defaults from "~/defaults.js";
export default function ({ $auth, error, store }) {
    let organizationuid = null;
    if($auth.user.user_type == defaults.usertypes[0] && $auth.user.admin) {
        organizationuid = $auth.user.admin.meta_value;
    }

    if($auth.user.user_type == defaults.usertypes[1]) {
        organizationuid = $auth.user.organization.uid;
    }

    if($auth.user.user_type == defaults.usertypes[2]) {
        organizationuid = $auth.user.employee.organization_uid;
    }

    if(!organizationuid) {
        error({
            statusCode: 404,
            message: defaults.notfound
        });
    }

    store.commit('global/setState', { organizationUID: organizationuid });
}