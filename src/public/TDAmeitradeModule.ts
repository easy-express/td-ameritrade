import { EasyExpressServer, IEasyExpressAttachableModule } from '@easy-express/server';
import axios from 'axios';
import qs from 'qs';

export type Token = {
  access_token: string;
  refresh_token: string;
};

export var instance: TDAmeritradeModule | undefined;

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
    if (instance !== undefined) {
      throw new Error('A TD Ameritrade Module was already created.');
    }

    this.redirectURI = redirectURI;
    this.clientID = clientID;
    instance = this;
  }

  /**
   * Creates a new endpoint for TD Ameritrade to send the auth code.
   *
   * @param server the EasyExpressServer this module is attaching to
   * @returns {Promise<unknown>} an empty promise that is resolved once the module is attached
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
   *
   * @param {string} code a code received from TD Ameritrade (coudl be either a refresh token or an auth code)
   * @param {boolean} isRefresh whether or not the code is a refresh token or not
   * @returns {Promise<Token>} a promise that returns a token
   */
  public getAccessTokenFromCode(code: string, isRefresh: boolean): Promise<Token> {
    code = decodeURIComponent(code);
    const data = this.getTokenOptions(code, isRefresh);
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
   * @param {string} code a code received from TD Ameritrade (refresh token or auth code)
   * @param {boolean} refreshToken whether or not the give code is a refresh token
   * @returns {string} the stringified token options for queries
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

  /**
   * Submits a GET query to TD Ameritrade's api.
   * @param {string} query the query to submit
   * @param {string} access_token tha access token for authentication
   * @returns {Promise<any>} returns the GET query results
   */
  public getQuery(query: string, access_token?: string): Promise<any> {
    return axios
      .get(
        `https://api.tdameritrade.com${query}`,
        access_token
          ? {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          : undefined,
      )
      .then((result) => result.data)
      .catch((e) => {
        return e;
      });
  }
}
