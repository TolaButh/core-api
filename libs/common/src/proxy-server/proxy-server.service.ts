import { Injectable } from '@nestjs/common';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { IProxyServerService } from './interfaces/proxy-server.service';
import { ProxyServerConnection } from './types/ProxyServerConnection.type';

@Injectable()
export class ProxyServerService implements IProxyServerService {
  public getConnection(): ProxyServerConnection {
    const connection: ProxyServerConnection = {
      connectionWithProtocal:
        'http://jokergame:Wandee1997@139.180.156.130:7878',
      connection: 'jokergame:Wandee1997@139.180.156.130:7878',
      host: '139.180.156.130',
      port: '7878',
      username: 'Wandee1997',
      password: 'jokergame',
    };
    return connection;
  }
  public getHttpsAgent() {
    return new HttpsProxyAgent(this.getConnection().connectionWithProtocal);
  }
}
