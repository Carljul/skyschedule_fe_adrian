import defaults from "~/defaults.js";
export default function ({ $auth, error }) {
    if($auth.user.user_type == defaults.usertypes[1]) {
        error({
            statusCode: 404, 
            message: defaults.notfound
        });
    }
}