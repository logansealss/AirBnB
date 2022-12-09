const awsBucket = ".amazonaws.com/"

function getAwsKey(url){
    if(url.includes(awsBucket)){
        const [_, key] = url.split(awsBucket)
        return key
    }
}

function getAwsArrDeleteObjects(arr){
    const res = []
    for(let i = 0; i < arr.length; i++){
        res.push({
            Key: arr[i]
        })
    }
    return res
}

module.exports = {
    getAwsKey,
    getAwsArrDeleteObjects
  };