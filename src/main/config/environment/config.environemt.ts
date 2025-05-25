import * as dotenv from 'dotenv';
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';
let path: string;

path = `./env/${NODE_ENV}.env`;
if (NODE_ENV == 'production') {
  path = '.env';
}

dotenv.config({ path });

class Env {
  public readonly path: string;
  public readonly database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    schema: string;
  };

  public readonly app: {
    port: number;
    uri_prefix: string;
    api_versions: Array<number>;
    tz: string;
    mode_debugger: boolean;
    seeds: Array<string>;
    node_env: string;
    maxFavoriteProducts: number;
  };

  public readonly jwt: {
    secret: string;
    expiresIn: string;
  };

  constructor() {
    this.database = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
    };
    this.app = {
      port: parseInt(process.env.PORT),
      uri_prefix: process.env.URI_PREFIX,
      api_versions: this.GetApiVersions(),
      tz: process.env.TZ,
      mode_debugger: this.ModeDebugger(),
      seeds: this.GetSeeds(),
      node_env: process.env.NODE_ENV,
      maxFavoriteProducts: parseInt(process.env.MAX_FAVORITE_PRODUCTS) || 10,
    };

    this.jwt = {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    };

    this.path = path;
  }

  IsProduction(): boolean {
    return NODE_ENV.toUpperCase() === 'PRODUCTION';
  }

  private ModeDebugger(): boolean {
    if (!process.env.MODE_DEBUGGER || process.env.MODE_DEBUGGER === 'false') {
      return false;
    }
    return true;
  }

  private GetApiVersions(): Array<number> {
    if (!process.env.API_VERSIONS) {
      return [1];
    }
    return process.env.API_VERSIONS.split(',').map((version) => Number(version.trim()));
  }
  private GetSeeds(): Array<string> {
    if (!process.env.SEEDS) {
      return [];
    }
    return process.env.SEEDS.split(',').map((seed) => seed.trim());
  }
}

export const env = new Env();
