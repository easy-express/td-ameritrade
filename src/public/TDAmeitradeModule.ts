import { EasyExpressServer, IEasyExpressAttachableModule } from '@easy-express/server';
import axios from 'axios';
import qs from 'qs';

export type Token = {
  access_token: string;
  refresh_token: string;
};

/**
 * A module that helps integrate TD Ameritrade's API into your Easy-Express Server.
 */
export class TDAmeritradeModule implements IEasyExpressAttachableModule {
  private redirectURI: string;
  private clientID: string;

  /**
   * Constructs a TDAmeitradeModule with the given params.
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
    return new Promise(() => {
      // Do nothing
    });
  }

  /**
   * Gets the TD Ameritrade login url.
   */
  public getLoginURL() {
    return `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${encodeURIComponent(
      this.redirectURI,
    )}&client_id=${this.clientID}@AMER.OAUTHAP`;
  }

  /**
   * Gets an access token using the first auth code that was saved from authenticating using TD Ameritrade Auth page.
   */
  public getAccessTokenFromCode(authCode: string, isRefresh: boolean): Promise<Token> {
    authCode = decodeURIComponent(authCode);
    const data = this.getTokenOptions(authCode, isRefresh);
    return axios({
      method: 'post',
      url: 'https://api.tdameritrade.com/v1/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    })
      .then((res) => {
        return {
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
        };
      })
      .catch((error) => {
        // console.error(error);
        return error;
      });
  }

  /**
   * Gets the options used to get access tokens.
   *
   * @param code the code received from TD Ameritrade authentication page
   * @param refreshToken the refresh token to use to get a new access token
   */
  private getTokenOptions(code: string, refreshToken: boolean): string {
    return qs.stringify({
      grant_type: refreshToken ? 'refresh_token' : 'authorization_code',
      refresh_token: refreshToken ? code : undefined,
      access_type: 'offline',
      code: refreshToken ? undefined : code,
      client_id: this.clientID,
      redirect_uri: this.redirectURI,
    });
  }
}
