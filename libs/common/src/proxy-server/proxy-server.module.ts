import { Module } from '@nestjs/common'
import { ProxyServerProvider } from './proxy-server.provider'

@Module({
  providers: [ProxyServerProvider],
  exports: [ProxyServerProvider],
})
export class ProxyServerModule {}