const awsBucketPrefix = "https://logan-sealss-example-bucket.s3.amazonaws.com/"

function getAwsKey(url){
    if(url.startsWith(awsBucketPrefix)){
        const [_, key] = url.split(awsBucketPrefix)
        return key
    }
}

module.exports = {
    getAwsKey
  };