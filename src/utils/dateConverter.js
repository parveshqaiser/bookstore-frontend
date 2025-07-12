

export let dateConverter = (val)=>{
    let dateSting = val?.split("T")[0];
    let [year,month,date] = dateSting.split("-");
    return `${date}-${month}-${year}`
};


