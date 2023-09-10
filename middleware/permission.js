import defaults from "~/defaults.js";
export default ({ route, $auth, error }) => {
    // employee and has permission from meta permissionkey
    const user = $auth.user;
    if(route.meta && Array.isArray(route.meta) && route.meta.length && route.meta[0].permissionKey && user.user_type == defaults.usertypes[2]) {
        const permissionKey = route.meta[0].permissionKey;
        const userFindPermission = user.permissions.find(row => (row.permission.permission_key == permissionKey) && (row.permission_value==1));
        const positionFindPermission = user.employee.position.permissions.find(row => (row.permission.permission_key == permissionKey) && (row.permission_value==1));
        if(Boolean(userFindPermission || positionFindPermission) === false) {
            error({
                statusCode: 404, 
                message: defaults.notfound
            });
        }
    }
};