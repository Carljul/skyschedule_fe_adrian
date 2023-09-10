import defaults from "~/defaults.js";
export default async function ({ error, store, $axios }) {
    try {
        const orgid = store.state.global.state.organizationUID;
        const res = await $axios.get(`/organization/${orgid}`);
        store.commit('global/setState', { organization: res.data.response });
    } catch($e) {
        error({
            statusCode: 404,
            message: defaults.notfound
        });
    }
}