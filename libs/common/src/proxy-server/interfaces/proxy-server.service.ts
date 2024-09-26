import { ProxyServerConnection } from '../types/ProxyServerConnection.type'

export interface IProxyServerService {
  getConnection(): ProxyServerConnection
}