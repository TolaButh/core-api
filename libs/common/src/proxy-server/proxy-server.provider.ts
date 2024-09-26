import { Provider } from '@nestjs/common'
import { ProxyServerService } from './proxy-server.service'

export const ProxyServerProvider: Provider = {
  provide: "IPROXY_SERVER_PROVIDER",
  useClass: ProxyServerService,
}