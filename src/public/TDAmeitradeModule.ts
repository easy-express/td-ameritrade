import { EasyExpressServer, IEasyExpressAttachableModule } from '@easy-express/server';

/**
 * A module that helps integrate TD Ameritrade's API into your Easy-Express Server.
 */
export class TDAmeritradeModule implements IEasyExpressAttachableModule {
  private redirectURI: string;
  private clientID: string;

  /**
   *
   * @param redirectURI the redirect URL for TD Ameritrade code to be sent to
   * @param clientID the TD Ameritrade app's client id.
   */
  constructor(redirectURI: string, clientID: string) {
    this.redirectURI = redirectURI;
    this.clientID = clientID;
  }

  /**
   * Creates a new endpoint for TD Ameritrade to send the auth code.
   *
   * @param server the EasyExpressServer this module is attaching to
   */
  public attachTo(server: EasyExpressServer): Promise<unknown> {
    let route = this.redirectURI.substring(this.redirectURI.indexOf('//') + 2);
    route = route.substring(route.indexOf('/'));
    server.instance.post(route, (req, res) => {
      console.log(req.body);
      // TODO
    });

    return new Promise(() => {
      // EMPTY
    });
  }

  /**
   * Gets the TD Ameritrade login url.
   */
  public getLoginURL() {
    return encodeURIComponent(
      `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${this.redirectURI}&client_id=${this.clientID}@AMER.OAUTHAP`,
    );
  }
}
