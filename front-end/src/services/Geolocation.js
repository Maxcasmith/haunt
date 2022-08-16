const permissionStatus = {
    GRANTED: "granted",
    DENIED: "denied",
    PROMPT: "prompt"
}

export function checkPermissions() {
    return new Promise(async (resolve, reject) => {
        navigator.permissions.query({name: 'geolocation'}).then(result => {
            switch (result.state) {
                case permissionStatus.GRANTED:
                    resolve(true);
                    break;
                case permissionStatus.PROMPT:
                    resolve(true);
                    break;
                case permissionStatus.DENIED:
                    reject("Permissions are denied");
                default:
                    reject("Could not check permissions");
            }
        });
    });
}

export async function getPosition(options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}) {
    if (await checkPermissions()) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve(pos),
                (error) => reject(error),
                options
            )
        })
    }
}
