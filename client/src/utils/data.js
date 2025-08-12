export const extractAccountData = (response) => {

    console.log('[ DEBUG ] IN EXTRACTACCOUNT DATA: ', response.data)

    if (response.data?.value?.account) {
        return response.data.value.account;
    }
    if (response.account) {
        return response.account;
    }
    if (response.data?.account) {
        return response.data.account;
    }
    return null;

};
