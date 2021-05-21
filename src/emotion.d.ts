import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    bgColor: {
      defaultWhite: string;
      defaultCream: string;
    };
    color: {
      subwayYellow: string;
      subwayGreen: string;
    };
  }
}
