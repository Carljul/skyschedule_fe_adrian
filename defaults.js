export default {
    limit: 15,
    limitlists: [15, 30, 50, 100],
    edit: 'Edit',
    trash: 'Trash',
    remove: 'Remove',
    restore: 'Restore',
    view: 'View',
    na: 'N/A',
    usertypes: ['Admin', 'Organization', 'Employee'],
    timein: 'Clock-in',
    timeout: 'Clock-out',
    breakin: 'Break',
    breakout: 'End Break',
    lunchin: 'Lunch',
    lunchout: 'End Lunch',
    notfound: 'The page that you are looking for was not found.',
    appname: 'SKY SCHEDULER',
    orgSessionKey: '__SESSION_ORG_UID',
    trashConfirm: {
        title: 'Trash Confirmation',
        html: 'Are you sure you want to move this to trash?',
        success: ' has been moved to trash.'
    },
    restoreConfirm: {
        title: 'Restore Confirmation',
        html: 'Are you sure you want to restore this?',
        success: ' has been restored.'
    },
    removeConfirm: {
        title: 'Permanent Remove',
        html: `Are you sure you want to permanently remove this? <strong>Note: This can't be undone.</strong>`,
        success: ' has been successfully removed.'
    },
    timezone: 'UTC'
};