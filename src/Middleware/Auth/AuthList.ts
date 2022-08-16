export const authList:object = {
    "user": [
        "LocationController.vote",
        "LocationController.geocode",
        "UserController.vote",
    ],
    "admin_read": [],
    "admin_write": [
        "LocationController.create",
        "UserController.update",
    ],
    "admin_delete": []
}

export const userPermissions:any = {
    "user": 1,
    "admin_read": 2,
    "admin_write": 4,
    "admin_delete": 8
}
