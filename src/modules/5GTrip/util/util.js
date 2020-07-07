import getToken from './getToken'
import axios from 'axios'
import qs from 'qs'

/**
 * Fetch
 */
axios.defaults.withCredentials = true
export const API = 'http://120.210.238.139:8085/eip?eip_serv_id='
export const Fetch = async (config = {}) => {
  let { url = '', data = {}, prefix = 'app.' } = config
  url = prefix + url
  data.eip_serv_id = url
  data.token = getToken.achieveToken(data)
  delete data.eip_serv_id
  const res = await axios({
    url: API + url,
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    data: qs.stringify(data),
  })
  return res.data || {}
}
