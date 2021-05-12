import { Platform } from "react-native";
import { checkMultiple, PERMISSIONS, requestMultiple } from "react-native-permissions";

export const checkPermission = async () => {
  const permission = Platform.OS === 'ios'
        ? await checkMultiple([
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          ])
        : await checkMultiple([
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ]);

    return Object.values(permission).filter(e => e.includes('granted')).length > 0
}

export const requestPermission = async () => {
   const permission = Platform.OS === 'ios'
        ? await requestMultiple([
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          ])
        : await requestMultiple([
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ]);

      return Object.values(permission).filter(e => e.includes('granted')).length > 0 
}