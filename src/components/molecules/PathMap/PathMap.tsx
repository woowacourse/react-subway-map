import { DefaultNode, Graph } from '@visx/network';
import { IStationRes } from '../../../type';

export type PathMapProps = {
  width?: number;
  height?: number;
  stations: IStationRes[] | undefined | null;
};

interface IStationVertex {
  x: number;
  y: number;
  name: string;
}

interface IPathLink {
  source: IStationVertex;
  target: IStationVertex;
}

const BASE_X_POS = 50;
const BASE_Y_POS = 50;

const PathMap = ({ stations, width = 800, height = 500 }: PathMapProps) => {
  const nodes: IStationVertex[] =
    stations?.map((station, index) => {
      return {
        x: BASE_X_POS,
        y: BASE_Y_POS + 100 * index,
        name: station.name,
      };
    }) || [];

  const links: IPathLink[] =
    stations?.map((_, index) => {
      return {
        source: nodes[index],
        target: nodes[index + 1] || nodes[0],
      };
    }) || [];

  const graph = {
    nodes,
    links,
  };

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={'#fff'} />
      <Graph<IPathLink, IStationVertex>
        graph={graph}
        top={20}
        left={360}
        nodeComponent={({ node: { name } }) =>
          name ? (
            <>
              <DefaultNode r={30} />
              <text x="-2.5%" y="1%">
                {name}
              </text>
            </>
          ) : (
            <>
              <DefaultNode />
            </>
          )
        }
        linkComponent={({ link: { source, target } }) => (
          <line
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            strokeWidth={5}
            stroke="#999"
            strokeOpacity={0.6}
          />
        )}
      />
    </svg>
  );
};

export default PathMap;
