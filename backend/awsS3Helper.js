const awsBucket = ".amazonaws.com/"

function getAwsKey(url){
    if(url.includes(awsBucket)){
        const [_, key] = url.split(awsBucket)
        return key
    }
}

module.exports = {
    getAwsKey
  };