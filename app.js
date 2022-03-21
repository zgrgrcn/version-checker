const express = require("express");
const app = express();
const axios = require("axios");

const devList = [
  "https://dacm-api.dev.energia.gitops.vodafone.com/api/accountManagement/v4/actuator/info",
  "https://dagm-api.dev.energia.gitops.vodafone.com/api/agreementManagement/v4/actuator/info",
  "https://dpm-api.dev.energia.gitops.vodafone.com/api/partnershipManagement/v4/actuator/info",
  "https://dcm-api.dev.energia.gitops.vodafone.com/api/customerManagement/v4/actuator/info",
  "https://dpr-api.dev.energia.gitops.vodafone.com/api/partyRoleManagement/v4/actuator/info",
  "https://dpam-api.dev.energia.gitops.vodafone.com/api/partyManagement/v4/actuator/info",
  "https://dsales-api.dev.energia.gitops.vodafone.com/api/shoppingCart/v4/actuator/info",
  "https://dgeo-api.dev.energia.gitops.vodafone.com/api/geographicAddressManagement/v4/actuator/info",
  "https://ddms-api.dev.energia.gitops.vodafone.com/api/documentManagement/v4/actuator/info",
  "https://dpim-api.dev.energia.gitops.vodafone.com/api/productInventoryManagement/v4/actuator/info",
  "https://reference-management-api.dev.energia.gitops.vodafone.com/api/referenceManagement/v4/actuator/info",
  "https://s3-api.dev.energia.gitops.vodafone.com/api/storageService/v4/actuator/info",
  "https://provision-api.dev.energia.gitops.vodafone.com/api/provision/actuator/info",
  "https://si-authorization-api.dev.energia.gitops.vodafone.com/api/si-authorization/actuator/info",
  "https://ui-backend-api.dev.energia.gitops.vodafone.com/api/ui-backend/actuator/info",
  "https://si-user-token-api.dev.energia.gitops.vodafone.com/api/si-user-token/actuator/info",
  "https://payment-methods-api.dev.energia.gitops.vodafone.com/api/paymentMethods/v1/actuator/info",
  "https://biztalk-tmf-api.dev.energia.gitops.vodafone.com/api/biztalk-tmf-api/actuator/info",
  "https://shoppingcartcheckout-api.dev.energia.gitops.vodafone.com/api/shoppingcart-checkout/actuator/info",
];
const pprdList = [
  "https://dacm-api.pprd.pre-prod-energia.vodafone.es/api/accountManagement/v4/actuator/info",
  "https://dagm-api.pprd.pre-prod-energia.vodafone.es/api/agreementManagement/v4/actuator/info",
  "https://dpm-api.pprd.pre-prod-energia.vodafone.es/api/partnershipManagement/v4/actuator/info",
  "https://dcm-api.pprd.pre-prod-energia.vodafone.es/api/customerManagement/v4/actuator/info",
  "https://dpr-api.pprd.pre-prod-energia.vodafone.es/api/partyRoleManagement/v4/actuator/info",
  "https://dpam-api.pprd.pre-prod-energia.vodafone.es/api/partyManagement/v4/actuator/info",
  "https://dsales-api.pprd.pre-prod-energia.vodafone.es/api/shoppingCart/v4/actuator/info",
  "https://dgeo-api.pprd.pre-prod-energia.vodafone.es/api/geographicAddressManagement/v4/actuator/info",
  "https://ddms-api.pprd.pre-prod-energia.vodafone.es/api/documentManagement/v4/actuator/info",
  "https://dpim-api.pprd.pre-prod-energia.vodafone.es/api/productInventoryManagement/v4/actuator/info",
  "https://reference-management-api.pprd.pre-prod-energia.vodafone.es/api/referenceManagement/v4/actuator/info",
  "https://s3-api.pprd.pre-prod-energia.vodafone.es/api/storageService/v4/actuator/info",
  "https://provision-api.pprd.pre-prod-energia.vodafone.es/api/provision/actuator/info",
  "https://si-authorization-api.pprd.pre-prod-energia.vodafone.es/api/si-authorization/actuator/info",
  "https://ui-backend-api.pprd.pre-prod-energia.vodafone.es/api/ui-backend/actuator/info",
  "https://si-user-token-api.pprd.pre-prod-energia.vodafone.es/api/si-user-token/actuator/info",
  "https://payment-methods-api.pprd.pre-prod-energia.vodafone.es/api/paymentMethods/v1/actuator/info",
  "https://biztalk-tmf-api.pprd.pre-prod-energia.vodafone.es/api/biztalk-tmf-api/actuator/info",
  "https://shoppingcart-checkout-api.pprd.pre-prod-energia.vodafone.es/api/shoppingcart-checkout/actuator/info",
];
const sit1List = [
  "https://dacm-api.sit1.energia.gitops.vodafone.com/api/accountManagement/v4/actuator/info",
  "https://dagm-api.sit1.energia.gitops.vodafone.com/api/agreementManagement/v4/actuator/info",
  "https://dpm-api.sit1.energia.gitops.vodafone.com/api/partnershipManagement/v4/actuator/info",
  "https://dcm-api.sit1.energia.gitops.vodafone.com/api/customerManagement/v4/actuator/info",
  "https://dpr-api.sit1.energia.gitops.vodafone.com/api/partyRoleManagement/v4/actuator/info",
  "https://dpam-api.sit1.energia.gitops.vodafone.com/api/partyManagement/v4/actuator/info",
  "https://dsales-api.sit1.energia.gitops.vodafone.com/api/shoppingCart/v4/actuator/info",
  "https://dgeo-api.sit1.energia.gitops.vodafone.com/api/geographicAddressManagement/v4/actuator/info",
  "https://ddms-api.sit1.energia.gitops.vodafone.com/api/documentManagement/v4/actuator/info",
  "https://dpim-api.sit1.energia.gitops.vodafone.com/api/productInventoryManagement/v4/actuator/info",
  "https://reference-management-api.sit1.energia.gitops.vodafone.com/api/referenceManagement/v4/actuator/info",
  "https://s3-api.sit1.energia.gitops.vodafone.com/api/storageService/v4/actuator/info",
  "https://provision-api.sit1.energia.gitops.vodafone.com/api/provision/actuator/info",
  "https://si-authorization-api.sit1.energia.gitops.vodafone.com/api/si-authorization/actuator/info",
  "https://ui-backend-api.sit1.energia.gitops.vodafone.com/api/ui-backend/actuator/info",
  "https://si-user-token-api.sit1.energia.gitops.vodafone.com/api/si-user-token/actuator/info",
  "https://payment-methods-api.sit1.energia.gitops.vodafone.com/api/paymentMethods/v1/actuator/info",
  "https://biztalk-tmf-api.sit1.energia.gitops.vodafone.com/api/biztalk-tmf-api/actuator/info",
  "https://shoppingcart-checkout-api.sit1.energia.gitops.vodafone.com/api/shoppingcart-checkout/actuator/info",
];
const sit2List = [
  "https://dacm-api.sit2.energia.gitops.vodafone.com/api/accountManagement/v4/actuator/info",
  "https://dagm-api.sit2.energia.gitops.vodafone.com/api/agreementManagement/v4/actuator/info",
  "https://dpm-api.sit2.energia.gitops.vodafone.com/api/partnershipManagement/v4/actuator/info",
  "https://dcm-api.sit2.energia.gitops.vodafone.com/api/customerManagement/v4/actuator/info",
  "https://dpr-api.sit2.energia.gitops.vodafone.com/api/partyRoleManagement/v4/actuator/info",
  "https://dpam-api.sit2.energia.gitops.vodafone.com/api/partyManagement/v4/actuator/info",
  "https://dsales-api.sit2.energia.gitops.vodafone.com/api/shoppingCart/v4/actuator/info",
  "https://dgeo-api.sit2.energia.gitops.vodafone.com/api/geographicAddressManagement/v4/actuator/info",
  "https://ddms-api.sit2.energia.gitops.vodafone.com/api/documentManagement/v4/actuator/info",
  "https://dpim-api.sit2.energia.gitops.vodafone.com/api/productInventoryManagement/v4/actuator/info",
  "https://reference-management-api.sit2.energia.gitops.vodafone.com/api/referenceManagement/v4/actuator/info",
  "https://s3-api.sit2.energia.gitops.vodafone.com/api/storageService/v4/actuator/info",
  "https://provision-api.sit2.energia.gitops.vodafone.com/api/provision/actuator/info",
  "https://si-authorization-api.sit2.energia.gitops.vodafone.com/api/si-authorization/actuator/info",
  "https://ui-backend-api.sit2.energia.gitops.vodafone.com/api/ui-backend/actuator/info",
  "https://si-user-token-api.sit2.energia.gitops.vodafone.com/api/si-user-token/actuator/info",
  "https://payment-methods-api.sit2.energia.gitops.vodafone.com/api/paymentMethods/v1/actuator/info",
  "https://biztalk-tmf-api.sit2.energia.gitops.vodafone.com/api/biztalk-tmf-api/actuator/info",
  "https://shoppingcart-checkout-api.sit2.energia.gitops.vodafone.com/api/shoppingcart-checkout/actuator/info",
];
const prodList = [
  "https://dacm-api.energia.vodafone.es/api/accountManagement/v4/actuator/info",
  "https://dagm-api.energia.vodafone.es/api/agreementManagement/v4/actuator/info",
  "https://dpm-api.energia.vodafone.es/api/partnershipManagement/v4/actuator/info",
  "https://dcm-api.energia.vodafone.es/api/customerManagement/v4/actuator/info",
  "https://dpr-api.energia.vodafone.es/api/partyRoleManagement/v4/actuator/info",
  "https://dpam-api.energia.vodafone.es/api/partyManagement/v4/actuator/info",
  "https://dsales-api.energia.vodafone.es/api/shoppingCart/v4/actuator/info",
  "https://dgeo-api.energia.vodafone.es/api/geographicAddressManagement/v4/actuator/info",
  "https://ddms-api.energia.vodafone.es/api/documentManagement/v4/actuator/info",
  "https://dpim-api.energia.vodafone.es/api/productInventoryManagement/v4/actuator/info",
  "https://reference-management-api.energia.vodafone.es/api/referenceManagement/v4/actuator/info",
  "https://s3-api.energia.vodafone.es/api/storageService/v4/actuator/info",
  "https://provision-api.energia.vodafone.es/api/provision/actuator/info",
  "https://si-authorization-api.energia.vodafone.es/api/si-authorization/actuator/info",
  "https://ui-backend-api.energia.vodafone.es/api/ui-backend/actuator/info",
  "https://si-user-token-api.energia.vodafone.es/api/si-user-token/actuator/info",
  "https://payment-methods-api.energia.vodafone.es/api/paymentMethods/v1/actuator/info",
  "https://biztalk-tmf-api.energia.vodafone.es/api/biztalk-tmf-api/actuator/info",
  "https://shoppingcart-checkout-api.energia.vodafone.es/api/shoppingcart-checkout/actuator/info",
];
const urlList = devList.concat(pprdList, sit1List, sit2List, prodList);

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
            } else
              totalResult.push({
                error: `actuator is not implemented for ${serviceName}`,
              });
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
