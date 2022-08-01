const express = require("express");
const app = express();
const axios = require("axios");

const {
  devList,
  pprdList,
  sit1List,
  sit2List,
  prodList,
} = require("./vf al-url-list.js");

const urlList = sit1List;
//.concat(pprdList, sit1List, sit2List, prodList);
console.log("urlList", urlList.length);

const promises = urlList.map((l) => axios.get(l));
const promisesResolved = promises.map((promise) =>
  promise.catch((error) => ({ error }))
);

function checkFailed(then) {
  return function (responses) {
    const someFailed = responses.some((response) => response.error);

    if (someFailed) {
      console.log("Some failed");
      // throw responses;
    }

    return then(responses);
  };
}
app.get("/", async function (req, res) {
  console.log("------------------------------------");
  let totalResult = {};
  await Promise.all(promisesResolved)
    .then(
      checkFailed((...totalRes) => {
        return totalRes;
      })
    )
    .then(
      axios.spread(function ([...totalRes]) {
        for (const res of totalRes) {
          if (res.error) {
            let url = res.error.config.url;
            let serviceName = getServiceName(url);
            let env = getEnv(url);
            if (totalResult.hasOwnProperty(serviceName)) {
              totalResult[serviceName].push({
                env,
                error: `${serviceName} service is down, error: ${res.error.message}`,
                url,
              });
            } else
              totalResult[serviceName] = [
                {
                  env,
                  error: `${serviceName} service is down, error: ${res.error.message}`,
                  url,
                },
              ];
          } else {
            let url = res.config.url;
            let serviceName = getServiceName(url);
            let env = getEnv(url);

            result = res.data;
            if (result.build) {
              if (totalResult.hasOwnProperty(serviceName)) {
                totalResult[serviceName].push({
                  env,
                  commitTime: result.build.time,
                  version: result.build.version,
                  url,
                });
              } else
                totalResult[serviceName] = [
                  {
                    env,
                    commitTime: result.build.time,
                    version: result.build.version,
                    url,
                  },
                ];
            } else {
              if (totalResult.hasOwnProperty(serviceName)) {
                totalResult[serviceName].push({
                  env,
                  error: `actuator is not implemented`,
                  url,
                });
              } else
                totalResult[serviceName] = [
                  {
                    env,
                    error: `actuator is not implemented`,
                    url,
                  },
                ];
            }
          }
        }
      })
    )
    .catch((error) => {
      console.log(error);
    });

  res.send(totalResult);
});

app.listen(process.env.PORT || 5000);

const getServiceName = (url) => {
  let serviceName = url.substring(
    url.indexOf("/api/") + 5,
    url.indexOf("/actuator")
  );
  return serviceName.substring(
    0,
    serviceName.indexOf("/") > 0 ? serviceName.indexOf("/") : 99
  );
};
const getEnv = (url) => {
  if (url.indexOf("pprd") > 0) return "pprd";
  else if (url.indexOf("dev") > 0) return "dev";
  else if (url.indexOf("sit1") > 0) return "sit1";
  else if (url.indexOf("sit2") > 0) return "sit2";
  else return "prod";
};
