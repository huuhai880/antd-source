import { COOKIE_JWT } from "@cookie/constant"
import { getAcessToken, getRefreshToken, setCookie, removeCookie } from "@cookie/cookie.helper"
import axios from "axios"
const API_URL_ROOT = process.env.REACT_APP_API_URL_ROOT
const API_AUTH_REFRESH_TOKEN = "/auth/refresh-token"

export default function (ctx = null) {
    const instance = axios.create({
        baseURL: API_URL_ROOT,
        headers: {
            "Content-Type": "application/json"
        }
    })

    instance.interceptors.request.use(
        (config) => {
            const token = getAcessToken(ctx)
            const { is_refresh = null, Authorization } = config.headers || {}
            if (is_refresh == '1' && Authorization) {
                config.headers["Authorization"] = Authorization
                config.headers["is_refresh"] = null
            } else {
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`
                }
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        (response) => {
            const { config } = response
            if (config.responseType && config.responseType === "blob") {
                return response
            }
            const { data: apiData } = response.data
            return apiData
        },
        async (err) => {
            const token = getAcessToken(ctx)
            const originalConfig = err.config
            let { data: apiData = {}, status } = err.response || {} // eslint-disable-line

            apiData = Object.assign(apiData, { status })
            if (!apiData.status) {
                return Promise.reject('Vui lòng kiểm tra lại kết nối.')
            }
            if (status == 501 || status == 400 || status == 404) {
                return Promise.reject(apiData)
            }
            const { message = null } = apiData || {}
            if (originalConfig.url !== "/auth/token" && status === 401 && !originalConfig._retry && message == 'jwt expired') {

                originalConfig._retry = true
                try {
                    const authData = getRefreshToken(ctx) || {}

                    const { refreshToken, remember = false } = authData
                    const dataToken = await instance.post(API_AUTH_REFRESH_TOKEN, { refreshToken, remember })
                    const { accessToken = '' } = dataToken || {}
                    if (ctx) {
                        const date = new Date()
                        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))
                        const expires = `; expires=${date.toGMTString()}`
                        ctx.res.setHeader('set-cookie', [`${COOKIE_JWT}=${JSON.stringify(dataToken)}${expires}`])
                    } else {
                        setCookie(COOKIE_JWT, JSON.stringify(dataToken))
                    }
                    originalConfig.headers.Authorization = `Bearer ${accessToken}`
                    originalConfig.headers.is_refresh = `1`

                    return instance(originalConfig)
                } catch (_error) {

                    return Promise.reject(_error)
                }
            } else if (!token) {
                localStorage.removeItem('userData')
                removeCookie(COOKIE_JWT)
            }

            return Promise.reject(apiData)
        }
    )
    return instance
}