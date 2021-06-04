export enum Color {
  RED_200 = 'rgb(254, 202, 202)',
  RED_300 = 'rgb(252, 165, 165)',
  RED_400 = 'rgb(248, 113, 113)',
  RED_500 = 'rgb(239, 68, 68)',
  RED_600 = 'rgb(220, 38, 38)',
  RED_700 = 'rgb(185, 28, 28)',
  RED_800 = 'rgb(153, 27, 27)',
  ORANGE_200 = 'rgb(253, 230, 138)',
  ORANGE_300 = 'rgb(252, 210, 140)',
  ORANGE_400 = 'rgb(246, 173, 84)',
  ORANGE_500 = 'rgb(237, 137, 54)',
  ORANGE_600 = 'rgb(222, 107, 31)',
  ORANGE_700 = 'rgb(193, 86, 33)',
  ORANGE_800 = 'rgb(156, 66, 32)',
  GREEN_200 = 'rgb(167, 243, 208)',
  GREEN_300 = 'rgb(110, 231, 183)',
  GREEN_400 = 'rgb(52, 211, 153)',
  GREEN_500 = 'rgb(16, 185, 129)',
  GREEN_600 = 'rgb(5, 150, 105)',
  GREEN_700 = 'rgb(4, 120, 87)',
  GREEN_800 = 'rgb(6, 95, 70)',
  CYAN_200 = 'rgb(129, 222, 234)',
  CYAN_300 = 'rgb(78, 207, 224)',
  CYAN_400 = 'rgb(39, 198, 218)',
  CYAN_500 = 'rgb(0, 188, 212)',
  CYAN_600 = 'rgb(5, 172, 193)',
  CYAN_700 = 'rgb(0, 152, 167)',
  CYAN_800 = 'rgb(2, 131, 143)',
  BLUE_200 = 'rgb(191, 219, 254)',
  BLUE_300 = 'rgb(147, 197, 253)',
  BLUE_400 = 'rgb(96, 165, 250)',
  BLUE_500 = 'rgb(59, 130, 246)',
  BLUE_600 = 'rgb(37, 99, 235)',
  BLUE_700 = 'rgb(29, 78, 216)',
  BLUE_800 = 'rgb(30, 64, 175)',
  PURPLE_200 = 'rgb(221, 214, 254)',
  PURPLE_300 = 'rgb(196, 181, 253)',
  PURPLE_400 = 'rgb(167, 139, 250)',
  PURPLE_500 = 'rgb(139, 92, 246)',
  PURPLE_600 = 'rgb(124, 58, 237)',
  PURPLE_700 = 'rgb(109, 40, 217)',
  PURPLE_800 = 'rgb(91, 33, 182)',
}

export enum CREWS {
  DANYEE = 'DANYEE',
  MARK = 'MARK',
  CHARLIE = 'CHARLIE',
  YORN = 'YORN',
}

export enum ApiStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export type Station = {
  id: number;
  name: string;
};

export type LineStation = Station & {
  distance?: number;
  transferLines?: Line[];
};

export type Line = {
  id: number;
  name: string;
  color: Color;
  stations: LineStation[];
};

export type LineAttribute = {
  name: Line['name'];
  color: Line['color'];
  upStationId: Station['id'];
  downStationId: Station['id'];
  distance: number;
};

export type SectionAttribute = {
  lineId: Line['id'];
  data: {
    upStationId: Station['id'];
    downStationId: Station['id'];
    distance: number;
  };
};

export type SearchResult = {
  stations: Station[];
  distance: number;
  defaultFare: number;
  fare: Record<string, number>;
};

export type Error = {
  message: string;
  status?: number;
  httpStatus?: number;
};
