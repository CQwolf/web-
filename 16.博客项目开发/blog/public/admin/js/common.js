// 表单数据对象化处理
function serializeToJSON(form) {
    // 初始对象的数据
    let formData = {};
    const f = form.serializeArray();
    f.forEach(item => {
        formData[item.name] = item.value;
    });
    return formData;
}