export default function swDev() {
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function determineAppServerKey() {
    var vapidPublicKey =
      "BI6YxG0XEVtsoiQw66uJRAqPdY_xO9BRxgJ1DdtSBtW7nmP_NxXwonAMkC-dLI4fHJ4qJj8x6N6Yo1k-M1uYNyw";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.log("response ", response);
    return response.pushManager.getSubscription()
    .then(function(subscription){
        return response.pushManager.subscribe({
            userVisibleOnly : true,
            applicationServerKey : determineAppServerKey()
        })
    })
  });
}
