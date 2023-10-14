const { storage } = require("./common");
const muteKey = 'mute'
export function getMuteStorage() {
    const s = storage.contains(muteKey)
    if (s) {
        // console.log('what con', storage.getBoolean(muteKey))

        return storage.getBoolean(muteKey)
    }
    return false
}
export function setMuteStorage(bool) {
    storage.set(muteKey, bool)
}