import StationListItem from './StationListItem';

export default {
  title: 'StationPage/StationListItem',
  component: StationListItem,
};

const Template = () => (
  <StationListItem
    stations={[]}
    station={{ name: '지하철역', id: 1, lines: [{ id: 1, color: '#123456', name: '1호선' }] }}
    deleteStation={() => {}}
    editStation={() => {}}
  />
);
export const Default = Template.bind({});
