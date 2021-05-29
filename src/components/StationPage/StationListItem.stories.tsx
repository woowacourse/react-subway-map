import StationListItem from './StationListItem';

export default {
  title: 'StationPage/StationListItem',
  component: StationListItem,
};

const Template = () => <StationListItem name='지하철역' id={1} />;
export const Default = Template.bind({});
